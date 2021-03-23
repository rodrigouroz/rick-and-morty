import { Container, Typography } from '@material-ui/core';
import CharacterList from './components/CharactersList';
import {
    APIResponse,
    CharacterInterface,
    getCharacters,
} from './lib/characters';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [charactersInfo, setCharactersInfo] = useState<APIResponse>();
    const [characters, setCharacters] = useState<CharacterInterface[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const response: APIResponse = await getCharacters();
            setCharactersInfo(response);
            setCharacters(response.results);
        }
        fetchData();
    }, []);

    const loadData = async () => {
        if (loaded) {
            return;
        }

        const response: APIResponse = await getCharacters(page + 1);
        setPage(page + 1);

        if (!response.info.next) {
            setLoaded(true);
        }

        setCharacters((characters) => characters.concat(response.results));
    };

    return (
        <div className='App'>
            <Container>
                <Typography variant='h1'>Rick and Morty characters</Typography>
                {charactersInfo && (
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
