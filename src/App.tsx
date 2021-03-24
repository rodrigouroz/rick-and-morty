import {
    Container,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';
import CharacterList from './components/CharactersList';
import {
    APIResponse,
    CharacterInterface,
    getCharacters,
    getSearchUrl,
} from './lib/characters';
import './App.css';
import { useEffect, useState } from 'react';
import useDebounce from './lib/useDebounce';

function App() {
    const [next, setNext] = useState<string | null>(null);
    const [characters, setCharacters] = useState<CharacterInterface[]>([]);
    const [q, setQ] = useState('');
    const [ loaded, setLoaded ] = useState(false);
    const searchTerm: string = useDebounce(q, 1000);

    /**
     * Avoid doing a fetch in three different places and extract to a function
     */
    useEffect(() => {
        async function fetchData() {
            const response: APIResponse = await getCharacters();
            setNext(response.info.next);
            setCharacters(response.results);
            setLoaded(response.info.count === response.results.length)
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData(searchTerm:string) {
            const searchParam = searchTerm ? getSearchUrl(searchTerm) : undefined
            const response: APIResponse = await getCharacters(searchParam);
            setNext(response.info.next);
            setCharacters(response.results);
            setLoaded(response.info.count === response.results.length)
        }
        fetchData(searchTerm);
    }, [searchTerm]);

    const loadData = async () => {
        if (!next) {
            return;
        }

        const response: APIResponse = await getCharacters(next);
        setNext(response.info.next);
        setCharacters((characters) => characters.concat(response.results));
        setLoaded(response.info.count === response.results.length)
    };

    return (
        <div className='App'>
            <Container>
                <Typography variant='h1'>Rick and Morty characters</Typography>
                <FormControl fullWidth variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-search'>
                        Search
                    </InputLabel>
                    <OutlinedInput
                        id='outlined-adornment-search'
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        labelWidth={60}
                    />
                </FormControl>
                {characters && (
                    <CharacterList
                        loadData={loadData}
                        loaded={loaded}
                        characters={characters}
                    />
                )}
            </Container>
        </div>
    );
}

export default App;
