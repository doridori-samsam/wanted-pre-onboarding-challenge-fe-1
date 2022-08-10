import ToDoPage from "../toDoPage/ToDoPage";
import LogIn from "../logIn/LogIn";

function Home() {
  const token = localStorage.getItem("token");

  return <>{token ? <ToDoPage /> : <LogIn />}</>;
}

export default Home;
