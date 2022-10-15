import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TodoComponent } from "./todo-component";
import { categoryTypes } from "../../interface/todo-list-state-interface";
import { categoryState } from "../../recoil/todo-recoil";

const MiddleContent = styled.div`
  margin-top: 1rem;
  font-size: 2rem;
  display: flex;
  position: relative;
  height: auto;
  margin-right: 5%;
  margin-left: 5%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;
const CategoryStyle = styled.div`
  margin-right: 3rem;
  margin-left: 2rem;
`;

const CategoryTitle = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding-left: 2%;
  padding-right: 2%;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const CategoryContent = styled.div`
  font-size: 1.3rem;
  padding-bottom: 1rem;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const ListPrint = () => {
  const [categorys, setCategorys] =
    useRecoilState<categoryTypes[]>(categoryState);
  return (
    <>
      <MiddleContent>
        {categorys.map((category: categoryTypes) => {
          if (category.isChecked === true)
            return (
              <div>
                <CategoryStyle>
                  <CategoryTitle>{category.name}</CategoryTitle>
                  <CategoryContent>
                    <TodoComponent id={category.id} />
                  </CategoryContent>
                </CategoryStyle>
              </div>
            );
        })}
      </MiddleContent>
    </>
  );
};
