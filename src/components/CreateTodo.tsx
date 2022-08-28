import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Todo from "./Todo";
import {
  ITodoList,
  todoState,
  categories,
  TodoSelector,
  CategoryState,
} from "../atom";
import React from "react";

interface ICreateTodo {
  todo: string;
}

const CreateTodo = () => {
  const { handleSubmit, register, watch, setValue } = useForm<ICreateTodo>();
  const setTodos = useSetRecoilState<ITodoList[]>(todoState);
  const [category, setCategory] = useRecoilState(CategoryState);
  const changeTodo = useRecoilValue(TodoSelector);
  const onSubmit = ({ todo }: ICreateTodo) => {
    setTodos((prev) => [{ text: todo, id: Date.now(), category }, ...prev]);
    setValue("todo", "");
  };
  const onInput = (event: React.MouseEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
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
        <select onInput={onInput}>
          <option value={categories.todo}>todo</option>
          <option value={categories.doing}>doing</option>
          <option value={categories.done}>done</option>
        </select>
      </form>
      <ul>
        {changeTodo.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default CreateTodo;
