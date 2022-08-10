import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NotFound from "../../components/NotFound";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { AuthContainer } from "../logIn/Style";
import { Welcome, GoToLogIn } from "./Style";
function SignUp() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //MUI 함수
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //이메일 input value state
  const [emailID, setEmailID] = useState("");

  function handleEmail(e) {
    setEmailID(e.target.value);
  }

  //이메일 유효성 검사 정규표현식
  const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,6}$/i;

  //이메일 아이디 & 비밀번호 유효 결과
  const [isFailed, setIsFailed] = useState({
    checkEmailError: false,
    checkPwdError: false,
    emailGuide: "",
    passwordGuide: "",
  });

  //포커싱 아웃시 이메일 유효 검사 함수
  function handleEmailFocus() {
    return checkEmail.test(emailID)
      ? setIsFailed({ checkEmailError: false })
      : setIsFailed({
          checkEmailError: true,
          emailGuide: "@을 포함한 이메일 주소를 입력하세요",
        });
  }

  //포커싱 아웃시 비밀번호 유효 검사 함수
  function handlePwdFocus() {
    return values.password.length >= 8
      ? setIsFailed({ checkPwdError: false })
      : setIsFailed({
          checkPwdError: true,
          passwordGuide: "8글자 이상의 비밀번호를 입력하세요",
        });
  }

  //회원가입 클릭
  async function submitSignUp(e) {
    e.preventDefault();
    if (!isFailed.checkEmailError && !isFailed.checkPwdError) {
      try {
        const res = await axios.post("http://localhost:8080/users/create", {
          email: emailID,
          password: values["password"],
        });
        console.log(res.data);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <>
      {token ? (
        <NotFound />
      ) : (
        <article>
          <AuthContainer>
            <EmojiPeopleIcon color="primary" sx={{ fontSize: 50 }} />
            <Welcome>만나서 반가워요!</Welcome>
            <TextField
              id="outlined-basic"
              label="이메일 주소"
              variant="outlined"
              sx={{ m: 1, width: "28ch" }}
              onChange={handleEmail}
              onBlur={handleEmailFocus}
              error={isFailed.checkEmailError}
              helperText={isFailed.emailGuide}
              required
            />
            <FormControl
              sx={{ m: 1, width: "28ch" }}
              variant="outlined"
              required
              error={false}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                비밀번호
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handlePwdFocus}
                error={isFailed.checkPwdError}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText
                id="outlined-adornment-password"
                error={isFailed.checkPwdError}
              >
                {isFailed.passwordGuide}
              </FormHelperText>
            </FormControl>
            <Button
              sx={{ m: 4, width: "34ch" }}
              variant="outlined"
              type="submit"
              onClick={submitSignUp}
            >
              회원가입
            </Button>
            <GoToLogIn>
              <span>이미 회원이신가요?</span>
              <Link to="/">
                <span className="link-signup">로그인</span>
              </Link>
            </GoToLogIn>
          </AuthContainer>
        </article>
      )}
    </>
  );
}

export default SignUp;
