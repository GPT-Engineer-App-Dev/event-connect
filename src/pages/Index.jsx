import { Container, Heading, VStack, Box, FormControl, FormLabel, Input, Button, List, ListItem, Text, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const addEvent = () => {
    if (eventName.trim() !== "") {
      if (editingIndex !== null) {
        const updatedEvents = [...events];
        updatedEvents[editingIndex] = eventName;
        setEvents(updatedEvents);
        setEditingIndex(null);
      } else {
        setEvents([...events, eventName]);
      }
      setEventName("");
    }
  };

  const editEvent = (index) => {
    setEventName(events[index]);
    setEditingIndex(index);
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="2xl" textAlign="center">Events Management App</Heading>
        
        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>{editingIndex !== null ? "Edit Event" : "Add New Event"}</Heading>
          <FormControl id="event-name" mb={4}>
            <FormLabel>Event Name</FormLabel>
            <Input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" onClick={addEvent}>{editingIndex !== null ? "Update Event" : "Add Event"}</Button>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Event List</Heading>
          <List spacing={3}>
            {events.map((event, index) => (
              <ListItem key={index} p={2} borderWidth="1px" borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
                <Text>{event}</Text>
              <Box>
                  <IconButton aria-label="Edit event" icon={<FaEdit />} mr={2} onClick={() => editEvent(index)} />
                  <IconButton aria-label="Delete event" icon={<FaTrash />} onClick={() => deleteEvent(index)} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;