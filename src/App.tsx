import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { hiddenState, MousehiddenState, todoState } from "./atom";
import Board from "./Components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Form from "./Components/Form";
import { atom } from "recoil";
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 60vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 20px;
  padding-top: 10px;
  flex-direction: column;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const Trash = styled.div`
  margin-top: 10px;
  font-size: 60px;
  margin-left: 850px;
`;

const FormDiv = styled.div`
  display: flex;
  margin: 0 auto;
`;
const headerDiv = styled.div`
  display: flex;
  justify-content: sp;
`;
const timeState = atom({
  key: "time",
  default: new Date(),
});
const Mmmdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
  margin: 10px auto;
`;
const TitleDiv = styled.div`
  margin: 0px 20px;
  font-size: 40px;
`;
const App = () => {
  const [todoBoards, setTodoBoards] = useRecoilState(todoState);
  const [time, setTime] = useRecoilState(timeState);
  const [hidden, setHidden] = useRecoilState(hiddenState);
  setInterval(() => {
    setTime(new Date());
  }, 1000);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (destination?.droppableId === "trash") {
      setTodoBoards((prev) => {
        const copyBoard = [...prev[source.droppableId]];
        console.log(copyBoard);
        copyBoard.splice(source.index, 1);
        return {
          ...prev,
          [source.droppableId]: copyBoard,
        };
      });
    }
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      //same move
      setTodoBoards((prev) => {
        const copyBoard = [...prev[source.droppableId]];

        const target = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination.index, 0, target);
        return {
          ...prev,
          [source.droppableId]: copyBoard,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      //cross move
      setTodoBoards((prev) => {
        const copyBoard = [...prev[source.droppableId]];
        const targetBoard = [...prev[destination.droppableId]];
        const target = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, target);
        return {
          ...prev,
          [source.droppableId]: copyBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };
  const onClick = () => {
    setHidden((prev) => !prev);
  };
  const getClock = () => {
    const date = new Date();
    const clock = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };
  return (
    <Wrapper>
      <Mmmdiv>
        <div>
          <span>{time.toLocaleDateString()}</span>
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <TitleDiv>
          <h1>To Do List</h1>
        </TitleDiv>
        <FormDiv>
          <div hidden={!hidden}>
            <FontAwesomeIcon onClick={onClick} icon={faPlus} />
          </div>
          <div hidden={hidden}>
            <Form />
          </div>
        </FormDiv>
      </Mmmdiv>

      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Boards>
            {Object.keys(todoBoards).map((boardName, index) => (
              <Board
                index={index}
                key={boardName}
                boardName={boardName}
                todos={todoBoards[boardName]}
              />
            ))}
          </Boards>
        </div>
        <Droppable droppableId="trash">
          {(magic, snap) => (
            <Trash ref={magic.innerRef} {...magic.droppableProps}>
              <FontAwesomeIcon icon={faTrash} />
            </Trash>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};
export default App;
