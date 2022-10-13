import styled from "styled-components";

const MainText = styled.div`
  position: absolute;
  font-size: 4rem;
  font-weight: 700;
  bottom: 10%;
  left: 5%;
`;

const DateText = styled.div`
  position: absolute;
  font-size: 2rem;
  font-weight: 700;
  bottom: 3%;
  right: 0;
`;

const HeaderStyled = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
  height: 7rem;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;

export const Header = () => {
  const date = new Date();
  return (
    <HeaderStyled>
      <MainText>To do List</MainText>
      <DateText>
        {" "}
        {date.getFullYear()}.{date.getDay()}.{date.getDate()}
      </DateText>
    </HeaderStyled>
  );
};
