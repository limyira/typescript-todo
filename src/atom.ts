import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}
export const formState = atom({
  key: "newBoard",
  default: {},
});

export const hiddenState = atom({
  key: "hidden",
  default: true,
});

export const MousehiddenState = atom({
  key: "mouseHidden",
  default: true,
});
export const TitleHiddenState = atom({
  key: "title",
  default: true,
});

export const todoState = atom<ITodoState>({
  key: "toDos",
  default: {
    todo: [],
    doing: [],
    done: [],
  },
});
