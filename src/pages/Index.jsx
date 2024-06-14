import { Container, Heading, VStack, Box, FormControl, FormLabel, Input, Button, List, ListItem, Text } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");

  const addEvent = () => {
    if (eventName.trim() !== "") {
      setEvents([...events, eventName]);
      setEventName("");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="2xl" textAlign="center">Events Management App</Heading>
        
        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Add New Event</Heading>
          <FormControl id="event-name" mb={4}>
            <FormLabel>Event Name</FormLabel>
            <Input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" onClick={addEvent}>Add Event</Button>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Event List</Heading>
          <List spacing={3}>
            {events.map((event, index) => (
              <ListItem key={index} p={2} borderWidth="1px" borderRadius="md">
                <Text>{event}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;