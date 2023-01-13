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
    <>
      <AddItemForm />
      <DataTable />
    </>
  );
}

export default Dashboard;
