import React from "react";
import { Button, Flex } from "@chakra-ui/react";

function Pagination({ filteredTodos, currentPage, setCurrentPage }) {
  const pageNumbers = [];
  const totalTodos = filteredTodos.length;

  for (let i = 1; i <= Math.ceil(totalTodos / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex mt={2} flexDirection="row" flexWrap="nowrap" gap={2}>
      {pageNumbers.map((number) => (
        <Button
          width="10px"
          onClick={() => setCurrentPage(number)}
          backgroundColor={number === currentPage ? "blue.300" : "white"}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
}

export default Pagination;
