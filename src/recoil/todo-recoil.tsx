import { atom, selector } from "recoil";
import {
  categoryTypes,
  todoListTypes,
} from "../interface/todo-list-state-interface";

export const todoListState = atom<todoListTypes[]>({
  key: "todoListState",
  default: [
    {
      id: 0,
      contents: "todolist 만들기",
      isCompleted: false,
      categoryId: 0,
    },
  ],
});

export const categoryState = atom<categoryTypes[]>({
  key: "categoryState",
  default: [
    {
      id: 0,
      name: "hi",
      isChecked: false,
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

export const categoryLastId = selector({
  key: " categoryLastId",
  get: ({ get }) => {
    const category = get(categoryState);
    const len = category.length;
    return len > 0 ? category[len - 1].id : 0;
  },
});

export const todoListContent = atom<string>({
  key: "todoListContent",
  default: "",
});

export const categoryIdSelect = atom<number>({
  key: "categroyIdSelect",
  default: 0,
});
