import { randomUUID } from "crypto";
import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categorys } from "../../api/category";
import { SelectVariants } from "../../components/category/select-mui";
//import { TodoUpdate } from "../../components/TodoUpdate/todo-update";
import { todoListTypes } from "../../interface/todo-list-state-interface";
import { todoListContent, todoListState } from "../../recoil/todo-recoil";
import { BottomContent } from "./todo-bottom-content";
import { ListPrint } from "./todo-middle-content";
import { TodoContent } from "./todo-top-content";

const TodoList = () => {
  return (
    <>
      <TodoContent />
      <ListPrint />
      <BottomContent />
    </>
  );
};

export default TodoList;
