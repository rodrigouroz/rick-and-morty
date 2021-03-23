import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { CharacterInterface } from '../lib/characters';

export default function CharactersList({ 
  characters
  }: { characters:CharacterInterface[]}) {

  const items = characters.map((character: CharacterInterface) => {
    return (
      <ListItem key={character.id}>
        <ListItemAvatar>
          <Avatar src={character.image} />
        </ListItemAvatar>
        <ListItemText primary={character.name} />
      </ListItem>
    );
  })

  return <List>{items}</List>;
} 