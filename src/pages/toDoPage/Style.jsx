import styled from "styled-components";

const ToDoHeader = styled.header`
  margin-top: 20px;
`;

const ToDoTitle = styled.h1`
  display: inline-block;
  margin: 0;
  margin-bottom: 2px;
  vertical-align: super;
  font-size: 3rem;
  color: #4485ff;
`;

const Day = styled.strong`
  font-size: 1.6rem;
  color: #9d9c9cec;
  font-family: "Pretendard-ExtraLight";
`;

const MonthDate = styled.div`
  font-size: 1rem;
  color: rgb(195, 195, 195);
`;

const BtnText = styled.span`
  font-family: "Pretendard-Regular";
  font-size: 0.9rem;
`;

const ListWrapper = styled.div`
  margin-top: 70px;
  margin-bottom: 40px;
`;

export { ToDoHeader, ToDoTitle, Day, MonthDate, BtnText, ListWrapper };
