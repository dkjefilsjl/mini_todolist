import styled from "styled-components";
import { Categorys } from "../../api/category";

const TopContent = styled.div`
  display: flex;
  position: relative;
  height: auto;
  justify-content: space-between;
  margin-right: 5%;
  margin-left: 5%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;
const Goal = styled.div`
  display: flex;
  width: 50%;
  padding-top: 2%;
  padding-bottom: 2%;
  box-sizing: border-box;
  border-right: 1px solid black;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const GoalTitle = styled.div`
  display: flex;
  font-size: 2rem;
  width: 50%;
  flex-grow: 1;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const GoalContent = styled.div`
  display: flex;
  font-size: 1.2rem;
  flex-grow: 2;
  width: 50%;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const CategoryCheckBox = styled.div`
  font-size: 1.5rem;
  display: flex;
  width: 50%;
  padding-top: 2%;
  padding-bottom: 2%;
  justify-content: center;
  align-items: center;
`;

const CategoryTitle = styled.div`
  display: flex;
  font-size: 2rem;
  width: 50%;
  flex-grow: 1;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const CategoryContent = styled.div`
  display: flex;
  font-size: 1.2rem;
  flex-grow: 2;
  width: 50%;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const TodoContent = () => {
  return (
    <>
      <TopContent>
        <Goal>
          <GoalTitle>Goal</GoalTitle>
          <GoalContent>
            Hi my name is seoyeon. <br />
            Let's dance~!
          </GoalContent>
        </Goal>
        <CategoryCheckBox>
          <CategoryTitle>Category</CategoryTitle>
          <CategoryContent>
            <Categorys />
          </CategoryContent>
        </CategoryCheckBox>
      </TopContent>
    </>
  );
};
