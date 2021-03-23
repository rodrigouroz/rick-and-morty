import { Container, Typography } from "@material-ui/core";
import CharacterList from "./components/CharactersList";
import { CharacterInterface, getCharacters } from "./lib/characters";
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [ characters, setCharacters ] = useState<CharacterInterface[]>();

  useEffect(() => {
    async function fetchData() {
      setCharacters(await getCharacters());
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <Container>
        <Typography variant="h1">
          Rick and Morty characters
        </Typography>
        {characters && <CharacterList characters={characters} />}
      </Container>
    </div>
  );
}

export default App;
