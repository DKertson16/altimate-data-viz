import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { useBearStore } from "../store/store";

function AddItemForm() {
  const pushTodo = useBearStore((state) => state.pushTodo);
  const setLoading = useBearStore((state) => state.setLoading);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title,
        userId,
        completed: status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await res.json();
    console.log(json);
    pushTodo(json);
    console.log("Submitted");
    setLoading(false);
  };

  return (
    <Box
      m={1}
      p={4}
      border="1px"
      borderColor="gray.200"
      backgroundColor="gray.50"
      borderRadius="md"
    >
      <form onSubmit={submit}>
        <FormControl isRequired maxWidth="700px" mx="auto" py={5}>
          <Flex flexDirection="column" gap={2}>
            <Heading size="lg">Add Item</Heading>
            <FormLabel>Title</FormLabel>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            <FormLabel>User ID</FormLabel>
            <Input type="number" onChange={(e) => setUserId(e.target.value)} />
            <FormLabel>Completed Status</FormLabel>
            <Select
              placeholder="Select status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </Select>
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              disabled={!title || !userId || !status}
            >
              Submit
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
}

export default AddItemForm;
