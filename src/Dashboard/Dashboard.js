import React, { useEffect } from "react";
import { useBearStore } from "../store/store";
import { Grid, GridItem } from "@chakra-ui/react";
import DataTable from "./DataTable";
import AddItemForm from "./AddItemForm";

function Dashboard() {
  const setTodos = useBearStore((state) => state.setTodos);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <GridItem w="100%">
        <DataTable />
      </GridItem>
      <GridItem w="100%">
        <AddItemForm />
      </GridItem>
    </Grid>
  );
}

export default Dashboard;
