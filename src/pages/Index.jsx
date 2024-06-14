import { Container, Heading, VStack, Box, FormControl, FormLabel, Input, Button, List, ListItem, Text, IconButton, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js"; // Import Supabase hooks
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx"; // Import the useSupabaseAuth hook

const Index = () => {
  const { data: events, isLoading, error } = useEvents(); // Use the useEvents hook to fetch events
  const addEventMutation = useAddEvent(); // Use the useAddEvent hook to add events
  const updateEventMutation = useUpdateEvent(); // Use the useUpdateEvent hook to update events
  const deleteEventMutation = useDeleteEvent(); // Use the useDeleteEvent hook to delete events
  const [eventName, setEventName] = useState("");
  const { session, logout } = useSupabaseAuth(); // Use the useSupabaseAuth hook to get session and logout

  const [editingIndex, setEditingIndex] = useState(null);

  const addEvent = () => {
    if (eventName.trim() !== "") {
      if (editingIndex !== null) {
        const updatedEvents = [...events];
        updatedEvents[editingIndex] = eventName;
        const updatedEvent = { id: events[editingIndex].id, name: eventName };
        updateEventMutation.mutate(updatedEvent);
        setEditingIndex(null);
      } else {
        addEventMutation.mutate({ name: eventName });
      }
      setEventName("");
    }
  };

  const editEvent = (index) => {
    setEventName(events[index].name);
    setEditingIndex(index);
  };

  const deleteEvent = (index) => {
    deleteEventMutation.mutate(events[index].id);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading events</Text>;
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="2xl" textAlign="center">Events Management App</Heading>
        
        <Box width="100%" textAlign="right">
          {session ? (
            <Button colorScheme="teal" onClick={logout}>Logout</Button>
          ) : (
            <Button colorScheme="teal" as={RouterLink} to="/login">Login</Button>
          )}
        </Box>

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
              <ListItem key={event.id} p={2} borderWidth="1px" borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
                <Link as={RouterLink} to={`/event/${event.id}`}><Text>{event.name}</Text></Link>
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