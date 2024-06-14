import { Container, Heading, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEvent } from "../integrations/supabase/index.js"; // Import the useEvent hook

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading, error } = useEvent(id); // Use the useEvent hook to fetch event data

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading event details</Text>;
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