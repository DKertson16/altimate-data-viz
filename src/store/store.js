import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  todos: [],
  setTodos: (todos) => set(() => ({ todos })),
  pushTodo: (todo) =>
    set(({ todos }) => {
      return {
        todos: [...todos, { ...todo, id: todos[todos.length - 1].id + 1 }],
      };
    }),
  editTodo: (todo) =>
    set(({ todos }) => {
      return {
        todos: todos.map((item) => {
          if (item.id === todo.id) {
            return todo;
          }
          return item;
        }),
      };
    }),
  deleteTodo: (todo) =>
    set(({ todos }) => {
      return {
        todos: todos.filter((t) => t.id !== todo.id),
      };
    }),

  loading: false,
  setLoading: (loading) => set(() => ({ loading })),
});

export const useBearStore = create(devtools(store));
