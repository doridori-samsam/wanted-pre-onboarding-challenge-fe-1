import styled from "styled-components";

const EditBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const BtnBackGround = styled.div`
  // border: 1px solid blue;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  text-align: center;
  border-radius: 50%;
  &:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
`;

export { EditBtnWrapper, BtnBackGround };
