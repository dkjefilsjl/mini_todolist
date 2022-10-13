import { randomUUID } from "crypto";
import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categorys } from "../../api/category";
import { TodoLists } from "../../api/todo-list";
import { SelectVariants } from "../../components/category/select-mui";
//import { TodoUpdate } from "../../components/TodoUpdate/todo-update";
import { todoListTypes } from "../../interface/todo-list-state-interface";
import { todoListContent, todoListState } from "../../recoil/todo-recoil";
import { BottomContent } from "./todo-bottom-content";
import { ListPrint } from "./todo-middle-content";
import { TodoContent } from "./todo-top-content";

const TodoList = () => {
  /* const [content, setContent] = useRecoilState<string>(todoListContent);

  const onClick = (value: string) => {
    setContent(value);
  };
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") onClick(e.target.value);
  };
*/
  return (
    <>
      <TodoContent />
      <ListPrint />
      <BottomContent />
      {/*<SelectVariants />
      <input onKeyDown={onKeyPress} />*/}
    </>
  );
};

export default TodoList;
