import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Button,
} from '@material-ui/core';
import { CharacterInterface } from '../lib/characters';

interface CharactersListProps {
    characters: CharacterInterface[];
    loadData(): void;
    loaded: boolean;
}

export default function CharactersList(props: CharactersListProps) {
    const items = props.characters.map((character: CharacterInterface) => {
        return (
            <ListItem key={character.id}>
                <ListItemAvatar>
                    <Avatar src={character.image} />
                </ListItemAvatar>
                <ListItemText primary={character.name} />
            </ListItem>
        );
    });

    return (
        <>
            <List>{items}</List>
            <Button onClick={props.loadData} disabled={props.loaded} variant='contained' color='primary'>
                Load more
            </Button>
        </>
    );
}
