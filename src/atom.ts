import { atom, selector } from "recoil";

export enum categories {
  "todo" = "todo",
  "doing" = "doing",
  "done" = "done",
}

export const CategoryState = atom<categories>({
  key: "category",
  default: categories.todo,
});

export interface ITodoList {
  text: string;
  id: number;
  category: "todo" | "doing" | "done";
}

export const todoState = atom<ITodoList[]>({
  key: "todo",
  default: [],
});

export const TodoSelector = selector({
  key: "selector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(CategoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
