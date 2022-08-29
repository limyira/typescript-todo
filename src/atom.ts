import { atom, selector } from "recoil";

export enum Categories {
  "todo" = "todo",
  "doing" = "doing",
  "done" = "done",
}

export const CategoryState = atom<Categories>({
  key: "category",
  default: Categories.todo,
});
export interface ITodoState {
  text: string;
  id: number;
  category: Categories;
}

export const TodoState = atom<ITodoState[]>({
  key: "todos",
  default: [],
});

export const TodoSelector = selector({
  key: "selector",
  get: ({ get }) => {
    const todos = get(TodoState);
    const category = get(CategoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
