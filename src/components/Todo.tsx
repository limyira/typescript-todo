import { useSetRecoilState } from "recoil";
import { ITodoList, todoState, categories } from "../atom";

const Todo = ({ text, id, category }: ITodoList) => {
  const todos = useSetRecoilState(todoState);
  const onClick = (data: ITodoList["category"]) => {
    todos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: data };
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      {text}
      {category !== "todo" && (
        <button onClick={() => onClick("todo")}>todo</button>
      )}
      {category !== "doing" && (
        <button onClick={() => onClick("doing")}>doing</button>
      )}
      {category !== "done" && (
        <button onClick={() => onClick("done")}>done</button>
      )}
    </li>
  );
};

export default Todo;
