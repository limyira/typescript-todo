import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, CategoryState, TodoState, TodoSelector } from "../atom";
import Todo from "./Todo";
interface ITodo {
  todo: string;
}

const CreateTodo = () => {
  const { register, setValue, handleSubmit } = useForm<ITodo>();
  const [todos, setTodos] = useRecoilState(TodoState);
  const newTodo = useRecoilValue(TodoSelector);
  const [newCat, setNewCat] = useRecoilState(CategoryState);
  const onSubmit = ({ todo }: ITodo) => {
    setTodos((prev) => [
      { text: todo, id: Date.now(), category: Categories.todo },
      ...prev,
    ]);
    setValue("todo", "");
  };
  const onInput = (event: React.MouseEvent<HTMLSelectElement>) => {
    setNewCat(event.currentTarget.value as any);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", { required: true })}
          placeholder="Write a todo"
        ></input>
        <button>Add</button>
      </form>
      <form>
        <select value={newCat} onInput={onInput}>
          <option value={Categories.todo}>Todo</option>
          <option value={Categories.doing}>Doing</option>
          <option value={Categories.done}>Done</option>
        </select>
      </form>
      <ul>
        {newTodo.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default CreateTodo;
