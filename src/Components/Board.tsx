import { Droppable } from "react-beautiful-dnd";
import DrCard from "./DrCard";
import {
  hiddenState,
  ITodo,
  MousehiddenState,
  todoState,
  TitleHiddenState,
} from "../atom";
import { useForm } from "react-hook-form";
import { constSelector, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import React from "react";

interface IBoard {
  todos: ITodo[];
  boardName: string;
  index: number;
}

interface IForm {
  todo: string;
  title: string;
}
const TodoInput = styled.input`
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  text-transform: uppercase;
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
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  font-size: 20px;
  padding: 0px 10px;
  margin-right: 10px;
`;

const DropBox = styled.div<IDropBox>`
  background-color: ${(props) => props.isOver && props.theme.over};
  padding: 10px;
  min-height: 300px;
`;
const HiddenBox = styled.div`
  width: 20px;
  height: 20px;
`;

const FormBtn = styled.div`
  border: none;
  cursor: pointer;
`;

const Board = ({ index, todos, boardName }: IBoard) => {
  const { register, setValue, handleSubmit, watch } = useForm<IForm>();
  const [hidden, setHidden] = useRecoilState(MousehiddenState);
  const [titleHidden, setTitleHidden] = useRecoilState(TitleHiddenState);
  const [deleteTodos, setTodos] = useRecoilState(todoState);

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
  const onMouseEnter = () => {
    setHidden((prev) => !prev);
  };
  const onMouseLeave = () => {
    setHidden((prev) => !prev);
  };
  const onclick = (event: React.MouseEvent<HTMLDivElement>) => {
    setTodos((prev) => {
      const lastBoard = Object.entries(prev);
      lastBoard.splice(index, 1);
      const finalBoard = Object.fromEntries(lastBoard);
      return {
        ...finalBoard,
      };
    });
    setHidden(true);
  };
  const titleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setTitleHidden((prev) => !prev);
  };
  const titleSubmit = ({ title }: IForm) => {
    setTitleHidden((prev) => !prev);
    setTodos((prev) => {
      const copyBoard = Object.entries(prev);
      copyBoard[index][0] = title;
      const newBoard = Object.fromEntries(copyBoard);
      return {
        ...newBoard,
      };
    });
  };
  return (
    <UlBox>
      <TitleBox>
        <HiddenBox onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
          <FormBtn onClick={titleClick} id={boardName} hidden={hidden}>
            🔨
          </FormBtn>
        </HiddenBox>
        <form onSubmit={handleSubmit(titleSubmit)} hidden={titleHidden}>
          <input
            {...register("title")}
            placeholder="please input title"
          ></input>
        </form>
        <Title hidden={!titleHidden}>{boardName}</Title>
        <HiddenBox onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
          <FormBtn
            tabIndex={index}
            id={boardName}
            onClick={onclick}
            hidden={hidden}
          >
            <span>❌</span>
          </FormBtn>
        </HiddenBox>
      </TitleBox>
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
