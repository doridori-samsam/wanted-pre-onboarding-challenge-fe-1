import { useState, forwardRef } from "react";
import axios from "axios";
import ToDoDelete from "../Modal/ToDoDelete";
import { EditBtnWrapper, BtnBackGround } from "./Style";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function ListInnerBtn({ contentId }) {
  const token = localStorage.getItem("token");

  //휴지통 아이콘 클릭 시 알림창
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //해당 리스트 삭제
  async function handleDelete() {
    try {
      const res = await axios.delete(
        "http://localhost:8080/todos/" + contentId,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <EditBtnWrapper>
      <BtnBackGround>
        <BorderColorIcon
          sx={{
            color: "#CCCCCC;",
            fontSize: "1.5rem",
            mt: "7px",
          }}
        />
      </BtnBackGround>
      <BtnBackGround onClick={handleClickOpen}>
        <DeleteForeverIcon
          sx={{
            color: "#CCCCCC",
            fontSize: "1.8rem",
            mt: "6px",
          }}
        />
      </BtnBackGround>
      <ToDoDelete onClose={handleClose} onDelete={handleDelete} isOpen={open} />
    </EditBtnWrapper>
  );
}

export default ListInnerBtn;
