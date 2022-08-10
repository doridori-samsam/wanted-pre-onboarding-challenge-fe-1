import styled from "styled-components";

const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0 0 15px 0;
  font-size: 2rem;
  color: rgb(48, 89, 212);
`;

const SubTitle = styled.h1`
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 1.3rem;
`;

const GoToSignUp = styled.div`
  width: 260px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgb(102, 145, 244);
`;

export { AuthContainer, Title, SubTitle, GoToSignUp };
