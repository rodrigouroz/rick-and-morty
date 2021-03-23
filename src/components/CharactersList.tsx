import {
    List,
    Button,
} from '@material-ui/core';
import { CharacterInterface } from '../lib/characters';
import CharacterInfo from './CharacterInfo';

interface CharactersListProps {
    characters: CharacterInterface[];
    loadData(): void;
    loaded: boolean;
}

export default function CharactersList(props: CharactersListProps) {
    const items = props.characters.map((character: CharacterInterface) => {
        return <CharacterInfo key={character.id} character={character} />;
    });

    return (
        <>
            <List>{items}</List>
            <Button
                onClick={props.loadData}
                disabled={props.loaded}
                variant='contained'
                color='primary'
            >
                Load more
            </Button>
        </>
    );
}
