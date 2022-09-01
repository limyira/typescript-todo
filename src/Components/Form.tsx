import { useForm } from "react-hook-form";
import styled from "styled-components";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { todoState, formState, hiddenState } from "../atom";
const AddForm = styled.form`
  display: flex;
  float: c;
  margin-bottom: 10px;
`;

interface IForm {
  addName: string;
  hidden: boolean;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const [data, setData] = useRecoilState(formState);
  const [todo, setTodos] = useRecoilState(todoState);
  const setHidden = useSetRecoilState(hiddenState);
  const onSubmit = ({ addName }: IForm) => {
    const newBoard = {
      [addName]: [],
    };
    setData(newBoard);
    const mergeBoard = Object.assign({}, todo, newBoard);
    setTodos((prev) => {
      return {
        ...prev,
        ...mergeBoard,
      };
    });
    setValue("addName", "");
    setHidden((prev) => !prev);
  };
  return (
    <AddForm onSubmit={handleSubmit(onSubmit)}>
      <span>{errors.addName?.message}</span>
      <input
        {...register("addName", {
          required: "Board Name is required",
          minLength: {
            value: 2,
            message: "please input more than two board Name",
          },
        })}
        placeholder="Add new board Name"
      ></input>
      <button>Add</button>
    </AddForm>
  );
};

export default Form;
