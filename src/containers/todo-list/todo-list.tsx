import { randomUUID } from "crypto";
import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import { TodoLists } from "../../api/todo-list";
//import { TodoUpdate } from "../../components/TodoUpdate/todo-update";
import { todoListTypes } from "../../interface/todo-list-state-interface";
import { todoListContent, todoListState } from "../../recoil/todo-recoil";

const TodoList = () => {
  const [content, setContent] = useRecoilState<string>(todoListContent);

  const onClick = (value: string) => {
    setContent(value);
  };
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") onClick(e.target.value);
  };

  return (
    <>
      <TodoLists />
      <input onKeyDown={onKeyPress} />
    </>
  );
};

export default TodoList;
