import React, { useCallback, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";

import Form from "./Components/Form";
import Todo from "./Components/Todo";

type TodoType = {
  id: number;
  name: string;
  completed: boolean;
};

const TodosPage = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleGetTodos = useCallback(() => {
    const storagedTodos = JSON.parse(String(localStorage.getItem("todos")));

    setTodos(storagedTodos);
  }, []);

  useEffect(() => {
    handleGetTodos();
  }, [handleGetTodos]);

  const handleSaveTodos = useCallback(
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));

      handleGetTodos();
    },
    [handleGetTodos]
  );

  const handleAddTodo = useCallback(
    (name: string) => {
      const storagedTodos = [
        ...todos,
        { id: todos.length + 1, name, completed: false },
      ];

      handleSaveTodos(storagedTodos);
    },
    [todos, handleSaveTodos]
  );

  const handleCompletedTodo = useCallback(
    (todo: TodoType) => {
      const index = todos.indexOf(todo);
      const todoChanged = {
        ...todos[index],
        completed: !todos[index].completed,
      };
      const newTodos = [...todos];
      newTodos[index] = todoChanged;

      handleSaveTodos(newTodos);
    },
    [todos, handleSaveTodos]
  );

  const handleDeleteTodo = useCallback(
    (id: number) => {
      const newTodos = todos.filter((todo) => todo.id !== id);

      handleSaveTodos(newTodos);
    },
    [todos, handleSaveTodos]
  );

  return (
    <Box>
      <Box p={2}>
        <Form onSubmit={handleAddTodo} />
      </Box>
      <Box p={4}>
        {todos?.map((todo) => (
          <Box key={todo.id}>
            <Todo
              todo={todo}
              onCompleted={handleCompletedTodo}
              onDelete={handleDeleteTodo}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TodosPage;
