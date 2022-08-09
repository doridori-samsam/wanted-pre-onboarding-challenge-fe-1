import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/home/logIn/LogIn";
import SignUp from "./pages/home/signUp/SignUp";
import Container from "@mui/material/Container";
import "./App.css";

function App() {
  return (
    <Container fixed>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
