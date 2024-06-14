import { useState } from 'react';
import { Container, Heading, VStack, Box, FormControl, FormLabel, Input, Button, List, ListItem, Text, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useJobs, useAddJob, useUpdateJob, useDeleteJob } from "../integrations/supabase/index.js"; // Import Supabase hooks
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx"; // Import the useSupabaseAuth hook

const JobManagement = () => {
  const { data: jobs, isLoading, error } = useJobs(); // Use the useJobs hook to fetch jobs
  const addJobMutation = useAddJob(); // Use the useAddJob hook to add jobs
  const updateJobMutation = useUpdateJob(); // Use the useUpdateJob hook to update jobs
  const deleteJobMutation = useDeleteJob(); // Use the useDeleteJob hook to delete jobs
  const [jobTitle, setJobTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const { isAdmin } = useSupabaseAuth(); // Use the useSupabaseAuth hook to get isAdmin

  const addJob = () => {
    if (jobTitle.trim() !== "") {
      if (editingIndex !== null) {
        const updatedJobs = [...jobs];
        updatedJobs[editingIndex] = jobTitle;
        const updatedJob = { id: jobs[editingIndex].id, title: jobTitle };
        updateJobMutation.mutate(updatedJob);
        setEditingIndex(null);
      } else {
        addJobMutation.mutate({ title: jobTitle });
      }
      setJobTitle("");
    }
  };

  const editJob = (index) => {
    setJobTitle(jobs[index].title);
    setEditingIndex(index);
  };

  const deleteJob = (index) => {
    deleteJobMutation.mutate(jobs[index].id);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading jobs</Text>;
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="2xl" textAlign="center">Job Management</Heading>

        {isAdmin && (
          <Box width="100%">
            <Heading as="h2" size="lg" mb={4}>{editingIndex !== null ? "Edit Job" : "Add New Job"}</Heading>
            <FormControl id="job-title" mb={4}>
              <FormLabel>Job Title</FormLabel>
              <Input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </FormControl>
            <Button colorScheme="teal" onClick={addJob}>{editingIndex !== null ? "Update Job" : "Add Job"}</Button>
          </Box>
        )}

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Job List</Heading>
          <List spacing={3}>
            {jobs.map((job, index) => (
              <ListItem key={job.id} p={2} borderWidth="1px" borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
                <Text>{job.title}</Text>
                {isAdmin && (
                  <Box>
                    <IconButton aria-label="Edit job" icon={<FaEdit />} mr={2} onClick={() => editJob(index)} />
                    <IconButton aria-label="Delete job" icon={<FaTrash />} onClick={() => deleteJob(index)} />
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default JobManagement;