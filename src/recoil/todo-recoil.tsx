import {
  atom,
  selector,
  useRecoilState,
  DefaultValue,
  useResetRecoilState,
} from "recoil";
import { todoListTypes } from "../interface/todo-list-state-interface";

export const todoListState = atom<todoListTypes[]>({
  key: "todoListState",
  default: [
    {
      id: 0,
      categoryId: 0,
      contents: "todolist 만들기",
      isCompleted: false,
    },
  ],
});

export const todoListLastId = selector({
  key: "todoListLastId",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const len = todoList.length;
    return len > 0 ? todoList[len - 1].id : 0;
  },
});

export const todoListContent = atom<string>({
  key: "todoListContent",
  default: "",
});
