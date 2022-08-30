import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IDrCard {
  index: number;
  todo: string;
  todoId: number;
}

interface ICard {
  isOver: boolean;
}

const Card = styled.div<ICard>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 8px;
  background-color: ${(props) =>
    props.isOver ? props.theme.cardOver : props.theme.cardColor};
  box-shadow: ${(props) => props.isOver && "0px 2px 5px rgba(0, 0, 0, 0.05)"};
`;
const DrCard = ({ index, todo, todoId }: IDrCard) => {
  return (
    <Draggable key={todoId} draggableId={todo} index={index}>
      {(magic, snap) => (
        <Card
          isOver={snap.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DrCard);
