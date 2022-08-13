import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";

function ToDoCreate({ open, cancelClick, onClose, update }) {
  //투두리스트 내용 state
  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
  });

  //투두리스트 내용 유효 검사 state
  const [isFailed, setIsFailed] = useState({
    checkTitle: false,
    checkContent: false,
  });

  //새 투두리스트 제목 설정 함수
  function handleInputTitle(e) {
    setNewContent({ ...newContent, title: e.target.value });
  }

  //새 투두리스트 내용 설정 함수
  function handleInputContent(e) {
    setNewContent({ ...newContent, content: e.target.value });
  }

  //새 투두리스트 추가 확인 버튼 클릭
  async function submitToDo(e) {
    e.preventDefault();
    if (newContent.title.length <= 0) {
      setIsFailed({ checkTitle: true });
    } else if (newContent.content.length <= 0) {
      setIsFailed({ checkContent: true });
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8080/todos",
          {
            title: newContent["title"],
            content: newContent["content"],
          },
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
      setNewContent({ title: "", content: "" });
      cancelClick();
      update();
    }
  }

  return (
    <div>
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
            error={isFailed.checkTitle}
            onBlur={handleInputTitle}
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
                error={isFailed.checkContent}
                onBlur={handleInputContent}
                rows={10}
                sx={{ fontFamily: "Pretendard-ExtraLight" }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={submitToDo}>
            확인
          </Button>
          <Button onClick={cancelClick}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ToDoCreate;
