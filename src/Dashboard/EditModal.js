import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useBearStore } from "../store/store";

function EditModal({ isOpen, onClose, todo }) {
  const editTodo = useBearStore((state) => state.editTodo);
  const [title, setTitle] = useState(todo.title);
  const [userId, setUserId] = useState(todo.userId.toString());
  const [status, setStatus] = useState(todo.completed.toString());

  const submit = (e) => {
    e.preventDefault();
    editTodo({
      ...todo,
      title,
      userId,
      completed: status,
    });
    onClose();
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={submit}>
        <FormControl isRequired maxWidth="700px" mx="auto" py={5}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="column" gap={2}>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormLabel>User ID</FormLabel>
                <Input
                  value={userId}
                  type="number"
                  onChange={(e) => setUserId(e.target.value)}
                />
                <FormLabel>Completed Status</FormLabel>
                <Select
                  value={status}
                  placeholder="Select status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="true">Completed</option>
                  <option value="false">Not Completed</option>
                </Select>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={!title || !userId || !status.length}
                type="submit"
                colorScheme="green"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </FormControl>
      </form>
    </Modal>
  );
}

export default EditModal;
