import React, { useState } from "react";
import {
  Center,
  Input,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useBearStore } from "../store/store";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";
import Pagination from "./Pagination";

function DataTable() {
  const todos = useBearStore((state) => state.todos);
  const deleteTodo = useBearStore((state) => state.deleteTodo);
  const loading = useBearStore((state) => state.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todo, setTodo] = useState({});
  const [titleFilter, setTitleFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState("");
  const [completedFilter, setCompletedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const filteredTodos = todos
    .filter((todo) => {
      if (titleFilter === "") {
        return true;
      } else {
        return todo.title.includes(titleFilter);
      }
    })
    .filter((todo) => {
      if (completedFilter === "all") {
        return true;
      } else {
        return todo.completed === (completedFilter === "true");
      }
    })
    .filter((todo) => {
      if (userIdFilter === "") {
        return true;
      } else {
        return todo.userId === parseInt(userIdFilter);
      }
    });

  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  if (!paginatedTodos.length && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }

  const editTodo = (todo) => {
    setTodo(todo);
    onOpen();
  };

  const deleteTodoItem = (todo) => {
    deleteTodo(todo);
  };

  if (loading) {
    return (
      <Center h="90vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <TableContainer
        m={1}
        p={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>User ID</Th>
              <Th>Completed</Th>
              <Th />
            </Tr>
            <Tr>
              <Th>
                <Input
                  onChange={(e) => setTitleFilter(e.target.value)}
                  placeholder="all"
                />
              </Th>
              <Th>
                <Input
                  onChange={(e) => setUserIdFilter(e.target.value)}
                  placeholder="all"
                  type="number"
                />
              </Th>
              <Th>
                <Select onChange={(e) => setCompletedFilter(e.target.value)}>
                  <option value="all">all</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </Select>
              </Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {paginatedTodos.map((todo) => (
              <Tr key={todo.id}>
                <Td>{todo.title}</Td>
                <Td>{todo.userId}</Td>
                <Td>{todo.completed.toString()}</Td>
                <Td>
                  <EditIcon
                    onClick={() => editTodo(todo)}
                    cursor="pointer"
                    mx={2}
                    color="gray.500"
                  />
                  <DeleteIcon
                    onClick={() => deleteTodoItem(todo)}
                    cursor="pointer"
                    mx={2}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Pagination
            filteredTodos={filteredTodos}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Table>
      </TableContainer>

      {isOpen && <EditModal isOpen={isOpen} onClose={onClose} todo={todo} />}
    </>
  );
}

export default DataTable;
