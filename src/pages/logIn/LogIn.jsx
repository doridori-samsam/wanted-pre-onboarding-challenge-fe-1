import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { AuthContainer, SubTitle, GoToSignUp } from "./Style";

function LogIn() {
  //MUI password input 스타일 함수

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

  //버튼 활성화 state
  const [isActive, setIsActive] = useState(true);

  //이메일 input value state
  const [emailID, setEmailID] = useState("");

  //이메일 아이디 input handle 함수
  function handleEmail(e) {
    setEmailID(e.target.value);
  }
  //이메일 아이디 & 비밀번호 유효 결과
  const [isFailed, setIsFailed] = useState({
    checkEmailError: false,
    checkPwdError: false,
    emailGuide: "",
    passwordGuide: "",
  });

  //이메일 유효성 검사 정규표현식
  const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,6}$/i;

  //포커싱 아웃시 이메일 유효 검사 함수
  function handleEmailFocus() {
    return checkEmail.test(emailID)
      ? setIsFailed({ checkEmailError: false })
      : setIsFailed({
          checkEmailError: true,
          emailGuide: "아이디가 형식에 맞지 않습니다",
        });
  }
  function handlePassword() {
    if (!isFailed.checkEmailError && values.password.length >= 8) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }
  //로그인 클릭
  async function submitLogIn(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/users/login", {
        email: emailID,
        password: values["password"],
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setIsFailed({
        checkPwdError: true,
        passwordGuide: "아이디와 비밀번호가 일치하지 않습니다",
      });
    }
  }

  return (
    <article>
      <AuthContainer>
        <DomainVerificationIcon color="primary" sx={{ fontSize: 50 }} />
        <SubTitle>나만의 투두리스트</SubTitle>
        <TextField
          sx={{ m: 1, width: "28ch" }}
          id="standard-basic"
          label="이메일 아이디"
          variant="standard"
          onChange={handleEmail}
          onBlur={handleEmailFocus}
          error={isFailed.checkEmailError}
          helperText={isFailed.emailGuide}
        />
        <FormControl sx={{ m: 1, width: "28ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            비밀번호
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            onKeyUp={handlePassword}
            error={isFailed.checkPwdError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="standard-adornment-password"
            error={isFailed.checkPwdError}
          >
            {isFailed.passwordGuide}
          </FormHelperText>
        </FormControl>
        <Button
          sx={{ m: 4, width: "34ch" }}
          variant="outlined"
          disabled={isActive}
          type="submit"
          onClick={submitLogIn}
        >
          로그인
        </Button>
        <GoToSignUp>
          <span>회원이 아니신가요?</span>
          <Link to="/auth">
            <span className="link-signup">회원가입</span>
          </Link>
        </GoToSignUp>
      </AuthContainer>
    </article>
  );
}

export default LogIn;
