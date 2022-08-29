import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ITodoState, Categories, TodoState } from "../atom";

const Todo = ({ text, id, category }: ITodoState) => {
  const setTodos = useSetRecoilState(TodoState);
  const onClick = (data: ITodoState["category"]) => {
    setTodos((oldTodos) => {
      console.log(oldTodos);
      const targetIndex = oldTodos.findIndex((oldTodo) => oldTodo.id === id);
      const newTodo = { text, id, category: data };
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTodos((oldTodos) => {
      const target = oldTodos.findIndex((oldTodo) => oldTodo.id === id);
      return [...oldTodos.slice(0, target), ...oldTodos.slice(target + 1)];
    });
  };
  return (
    <>
      <li>{text}</li>
      {category !== Categories.todo && (
        <button onClick={() => onClick(Categories.todo)}>Todo</button>
      )}
      {category !== Categories.doing && (
        <button onClick={() => onClick(Categories.doing)}>Doing</button>
      )}
      {category !== Categories.done && (
        <button onClick={() => onClick(Categories.done)}>Done</button>
      )}
      <button onClick={deleteClick}>❌</button>
    </>
  );
};

export default Todo;
