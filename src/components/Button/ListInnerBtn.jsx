import { useState } from "react";
import axios from "axios";
import ToDoEdit from "../Modal/ToDoEdit";
import ToDoDelete from "../Modal/ToDoDelete";
import { EditBtnWrapper, BtnBackGround } from "./Style";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function ListInnerBtn({ contentId, update }) {
  const token = localStorage.getItem("token");

  //휴지통 아이콘 클릭 시 알림창
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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
      update();
    } catch (err) {
      console.error(err);
    }
  }
  //수정 아이콘 클릭 시 모달 창 open 상태
  const [editOpen, setEditOpen] = useState(false);

  function handleEditOpen() {
    setEditOpen(true);
  }

  function handleEditClose() {
    setEditOpen(false);
  }

  return (
    <EditBtnWrapper>
      <BtnBackGround onClick={handleEditOpen}>
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
      <ToDoDelete
        onClose={handleClose}
        onDelete={handleDelete}
        isOpen={open}
        update={update}
      />
      <ToDoEdit
        open={editOpen}
        onClose={handleEditClose}
        cancelClick={handleEditClose}
        contentId={contentId}
      />
    </EditBtnWrapper>
  );
}

export default ListInnerBtn;
