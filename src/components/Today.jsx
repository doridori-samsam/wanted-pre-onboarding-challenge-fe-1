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
const weekNames = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
const todayMonth = monthNames[today.getMonth()];
const todayDate = today.getDate();
const todayWeek = weekNames[today.getDay()];

export { todayMonth, todayWeek, todayDate };
