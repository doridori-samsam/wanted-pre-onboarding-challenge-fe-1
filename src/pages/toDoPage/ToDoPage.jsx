import { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import ToDoCreate from "../../components/Modal/ToDoCreate";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ToDoHeader, ToDoTitle, Day, MonthDate, BtnText } from "./Style";
import axios from "axios";

function ToDoPage() {
  //오늘 날짜 표시
  const today = new Date();
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const todayMonth = monthNames[today.getMonth()];
  const todayDate = today.getDate();
  const weekNames = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const todayWeek = weekNames[today.getDay()];

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
  }, [listData]);

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
      <ToDoList mapdata={listData} />
      <ToDoCreate
        onClose={handleModalClose}
        open={open}
        cancelClick={handleModalClose}
      />
    </>
  );
}

export default ToDoPage;
