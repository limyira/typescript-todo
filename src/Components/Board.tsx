import { Droppable } from "react-beautiful-dnd";
import DrCard from "./DrCard";
import { ITodo, todoState } from "../atom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface IBoard {
  todos: ITodo[];
  boardName: string;
}

interface IForm {
  todo: string;
}

const Board = ({ todos, boardName }: IBoard) => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(todoState);
  const onSubmit = ({ todo }: IForm) => {
    setValue("todo", "");
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setTodos((prev) => {
      return {
        ...prev,
        [boardName]: [newTodo, ...prev[boardName]],
      };
    });
  };
  const TodoInput = styled.input`
    width: 100%;
  `;

  const Title = styled.h2`
    text-align: center;
    text-transform: uppercase;
    margin: 10px 0px;
  `;

  const UlBox = styled.div`
    width: 320px;
    min-height: 380px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.bordColor};
  `;
  interface IDropBox {
    isOver: boolean;
    isFrom: boolean;
  }

  const DropBox = styled.div<IDropBox>`
    background-color: ${(props) => props.isOver && props.theme.over};
    padding: 10px;
    min-height: 300px;
  `;
  return (
    <UlBox>
      <Title>{boardName}</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TodoInput {...register("todo")}></TodoInput>
      </form>
      <Droppable droppableId={boardName}>
        {(magic, snap) => (
          <DropBox
            isOver={snap.isDraggingOver}
            isFrom={Boolean(snap.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {todos.map((todo, index) => (
              <DrCard
                key={todo.id}
                index={index}
                todo={todo.text}
                todoId={todo.id}
              />
            ))}
            {magic.placeholder}
          </DropBox>
        )}
      </Droppable>
    </UlBox>
  );
};

export default Board;
