import { Container, Heading, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details based on the ID
    // For now, we'll use a placeholder event
    const fetchedEvent = {
      id,
      name: `Event ${id}`,
      description: `Details of event ${id}`,
    };
    setEvent(fetchedEvent);
  }, [id]);

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <Box width="100%">
        <Heading as="h1" size="2xl" textAlign="center">{event.name}</Heading>
        <Text mt={4}>{event.description}</Text>
      </Box>
    </Container>
  );
};

export default EventDetails;