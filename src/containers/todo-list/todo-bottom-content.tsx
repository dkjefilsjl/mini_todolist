import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categorys } from "../../api/category";
//import { AddLists } from "../../api/category-temp";
import { onCreate } from "../../api/todo-list-temp";
import { SelectVariants } from "../../components/category/select-mui";
import {
  categoryTypes,
  todoListTypes,
} from "../../interface/todo-list-state-interface";
import {
  categoryIdSelect,
  categoryLastId,
  categoryState,
  todoListContent,
  todoListLastId,
  todoListState,
} from "../../recoil/todo-recoil";

const BottomStyle = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  display: flex;
  position: relative;
  height: auto;
  margin-right: 5%;
  margin-left: 5%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;

const SelectBox = styled.div`
  margin-right: 2%;
  margin-left: 2%;
`;

const TextInput = styled.input`
  min-width: 80%;
  margin-bottom: 0.5rem;
`;

export interface dataProps {
  data: todoListTypes;
  link: string;
}

export const BottomContent = () => {
  const [content, setContent] = useState<string>("");
  const lastId = useRecoilValue<number>(todoListLastId);
  const [categoryId, setcategoryId] = useRecoilState<number>(categoryIdSelect);
  const [lists, setLists] = useRecoilState<todoListTypes[]>(todoListState);

  const addHandeler = (e: any) => {
    e.preventDefault();
    console.log(e.target);
    setContent(e.target.value);
    console.log("content = " + content);
  };

  /*const deleteHandeler = (e) => {
    e.preventDefault();
  }*/

  /*const onClick = (value: string) => {
    setContent(value);
  };
*/
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      const data: todoListTypes = {
        id: lastId + 1,
        contents: content,
        isCompleted: false,
        categoryId: categoryId,
      };
      onCreate(data, "http://localhost:3000/lists");
      setLists(lists.concat(data));
      console.log("data = " + data);
    }
  };
  return (
    <>
      <BottomStyle>
        <SelectBox>
          <SelectVariants />
        </SelectBox>
        <TextInput
          value={content}
          onKeyDown={onKeyPress}
          onChange={(e) => {
            addHandeler(e);
          }}
        ></TextInput>
      </BottomStyle>
    </>
  );
};
