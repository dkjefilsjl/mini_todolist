import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categorys } from "../../api/category";
import { TodoLists } from "../../api/todo-list";
import { SelectVariants } from "../../components/category/select-mui";
import { categoryTypes } from "../../interface/todo-list-state-interface";
import { categoryState, todoListContent } from "../../recoil/todo-recoil";

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

const TextBox = styled.input`
  min-width: 80%;
  margin-bottom: 0.5rem;
`;

export const BottomContent = () => {
  const [content, setContent] = useRecoilState<string>(todoListContent);

  const onClick = (value: string) => {
    setContent(value);
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") onClick(e.target.value);
  };
  return (
    <>
      <BottomStyle>
        <SelectBox>
          <SelectVariants />
        </SelectBox>
        <TextBox onKeyDown={onKeyPress}></TextBox>
      </BottomStyle>
    </>
  );
};
