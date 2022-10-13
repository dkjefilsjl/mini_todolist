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
      <div>카데고리 목록</div>
      <Categorys />
      <div>
        <br />
        리스트 목록
      </div>
      <TodoLists />
      <div>
        <br />
        리스트 추가하기
      </div>
      <SelectVariants />
      <input onKeyDown={onKeyPress} />
    </>
  );
};

export default TodoList;
