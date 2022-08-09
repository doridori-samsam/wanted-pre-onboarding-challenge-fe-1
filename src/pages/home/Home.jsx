import { useState } from "react";
import LogIn from "./logIn/LogIn";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Style from "./Style.jsx";
import "./home.css";

function Home() {
  const token = localStorage.getItem("token");

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
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
  };

  return (
    <>
      {token ? (
        <>
          <header className="header-home">
            <h1>오늘 할 일</h1>
            <Button
              sx={{
                padding: "0",
                height: "45px;",
                float: "right",
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleIcon sx={{ fontSize: 40, color: "#4485ff;" }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <span className="btn-logout">로그아웃</span>
              </MenuItem>
            </Menu>
            <div>
              <strong className="day">{todayWeek}</strong>
            </div>
            <div className="month-date">
              {todayMonth}&nbsp;
              {todayDate}일
            </div>
          </header>
        </>
      ) : (
        <LogIn />
      )}
    </>
  );
}

export default Home;
