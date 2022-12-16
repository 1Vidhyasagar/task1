import { Container, Flex, Heading, List, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import Player from "./components/Player";

function App() {
  const [players, setPlayer] = useState([
    { name: "Name" },
    { name: "Surname" },
    { name: "Profession" },
    { name: "Age" },
    { name: "Address" },
  ]);

  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  console.log(isOver);
  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const movePlayerToTeam = (item) => {
    console.log(item);
    setPlayer((prev) => prev.filter((_, i) => item.index !== i));
    setTeam((prev) => [...prev, item]);
  };
  const removePlayerFromTeam = (item) => {
    setTeam((prev) => prev.filter((_, i) => item.index !== i));
    setPlayer((prev) => [...prev, item]);
  };

  return (
    <Container maxW="" backgroundColor="gray.50">
      <Heading p="2" align="center" color="GrayText">
        Drag and drop form
      </Heading>

      <Flex justify="space-between" height="90vh" align="center">
        <Stack width="300px">
          <Heading fontSize="2xl" color="yellow.800" textAlign="center">
            Fill ups
          </Heading>
          <List
            bgGradient={
              isPlayerOver
                ? "linear(to-b, black.500, black.800)"
                : "linear(to-b, black.200, black.500)"
            }
            ref={removeFromTeamRef}
            p="4"
            minH="70vh"
            boxShadow="2xl"
            borderRadius="md"
          >
            {players.map((p, i) => (
              <Player
                item={p}
                key={i}
                playerType="player"
                onDropPlayer={movePlayerToTeam}
                index={i}
              />
            ))}
          </List>
        </Stack>
        <Stack width="600px">
          <Heading fontSize="2xl" color="grey.800" textAlign="center">
            Drag here
          </Heading>
          <List
            bgGradient={
              isOver
                ? "linear(to-b, black.300, black.500)"
                : "linear(to-b, black.100, black.200)"
            }
            ref={addToTeamRef}
            minH="70vh"
            boxShadow="2xl"
            borderRadius="md"
            p="4"
          >
            {team.map((p, i) => (
              <Player
                item={p}
                key={i}
                index={i}
                playerType="team"
                onDropPlayer={removePlayerFromTeam}
              />
            ))}
          </List>
        </Stack>
        <Stack>
        <Heading fontSize="3xl" color="grey.800" textAlign="center">
        <ButtonGroup variant='outline' spacing='1'>
  <Button>Undo</Button>
  <Button >Redo</Button>
</ButtonGroup>
    <br/><br/> <br/><br/><br/>
     <ButtonGroup variant='outline' spacing='1'>
  <Button colorScheme='blue'>Save</Button>
  <Button colorScheme='grey-100'>Preview</Button>
  <Button>Cancel</Button>
</ButtonGroup>
          </Heading>
        </Stack>
      </Flex>
    </Container>
  );
}

export default App;