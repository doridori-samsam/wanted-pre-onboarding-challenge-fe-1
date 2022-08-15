import { useState, useEffect } from "react";
import { todayMonth, todayWeek, todayDate } from "../../components/Today";
import ToDoList from "./ToDoList";
import useUpdate from "../../hooks/useUpdate";
import ToDoCreate from "../../components/Modal/ToDoCreate";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ToDoHeader, ToDoTitle, Day, MonthDate, BtnText } from "./Style";
import axios from "axios";

function ToDoPage() {
  const { upDate, isUpDate } = useUpdate();

  //MUI 로그아웃 버튼 함수
  const [anchorEl, setAnchorEl] = useState(null);
  const isShow = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogOut() {
    setAnchorEl(null);
    localStorage.removeItem("token");
    window.location.reload();
  }

  //새 리스트 작성 버튼 클릭 함수
  const [open, setOpen] = useState(false);

  function handleModalOpen() {
    setAnchorEl(null);
    setOpen(true);
  }
  function handleModalClose() {
    setOpen(false);
  }

  //투두리스트 받아오기
  const [listData, setListData] = useState([]);

  useEffect(() => {
    async function getToDoList() {
      try {
        const res = await axios.get("http://localhost:8080/todos/", {
          headers: {
            Authorization: localStorage.token,
          },
        });
        setListData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    getToDoList();
  }, [isUpDate]);

  return (
    <>
      <ToDoHeader>
        <ToDoTitle>오늘 할 일</ToDoTitle>
        <IconButton
          sx={{
            float: "right",
          }}
          id="basic-button"
          aria-controls={isShow ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isShow ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon sx={{ fontSize: 40, color: "#4485ff;" }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isShow}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleModalOpen}>
            <BtnText>새 리스트 작성</BtnText>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <BtnText>로그아웃</BtnText>
          </MenuItem>
        </Menu>
        <div>
          <Day>{todayWeek}</Day>
        </div>
        <MonthDate>
          {todayMonth}&nbsp;
          {todayDate}일
        </MonthDate>
      </ToDoHeader>
      <ToDoList mapdata={listData} update={upDate} />
      {open === true ? (
        <ToDoCreate
          onClose={handleModalClose}
          open={open}
          cancelClick={handleModalClose}
          update={upDate}
        />
      ) : null}
    </>
  );
}

export default ToDoPage;
