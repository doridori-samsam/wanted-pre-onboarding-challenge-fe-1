import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";

function ToDoEdit({ open, onClose, cancelClick, contentId, update }) {
  const token = localStorage.getItem("token");

  //투두리스트 데이터
  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
  });

  //해당 투두리스트 데이터 불러오기
  useEffect(() => {
    if (open === true) {
      async function getToDo() {
        try {
          const res = await axios.get(
            "http://localhost:8080/todos/" + contentId,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setTodoData({
            title: res.data.data.title,
            content: res.data.data.content,
          });
        } catch (err) {
          console.error(err);
        }
      }
      getToDo();
    }
  }, []);

  console.log("수정페이지");

  //제목, 내용 수정 handle 함수
  function handleEditTitle(e) {
    setTodoData({ ...todoData, title: e.target.value });
  }

  function handleEditContent(e) {
    setTodoData({ ...todoData, content: e.target.value });
  }

  //투두리스트 내용 유효 검사 state
  const [isFailed, setIsFailed] = useState({
    checkTitle: false,
    checkContent: false,
  });

  //해당 리스트 수정
  async function submitEdit(e) {
    e.preventDefault();
    if (todoData.title.length <= 0) {
      setIsFailed({ checkTitle: true });
    } else if (todoData.content.length <= 0) {
      setIsFailed({ checkContent: true });
    } else {
      try {
        const res = await axios.put(
          "http://localhost:8080/todos/" + contentId,
          {
            title: todoData.title,
            content: todoData.content,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        onClose();
        update();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          paddingLeft: "15px",
          color: "#4485ff;",
          fontFamily: "Pretendard-Regular",
          fontSize: "1.5rem",
        }}
      >
        <BorderColorIcon
          sx={{
            fontFamily: "Pretendard-Regular",
            fontSize: "22px",
            verticalAlign: "base-line",
          }}
        />
        할 일
      </DialogTitle>
      <DialogContent sx={{ padding: "15px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="제목"
          type="text"
          variant="standard"
          defaultValue={todoData.title}
          key={todoData.title}
          onBlur={handleEditTitle}
          error={isFailed.checkTitle}
          sx={{ marginBottom: "20px", fontFamily: "Pretendard-Medium;" }}
        />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mt: "10px", width: "35ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-static"
              label="내용"
              multiline
              defaultValue={todoData.content}
              error={isFailed.checkContent}
              onBlur={handleEditContent}
              rows={10}
              sx={{ fontFamily: "Pretendard-ExtraLight" }}
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={submitEdit}>
          확인
        </Button>
        <Button onClick={cancelClick}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ToDoEdit;
