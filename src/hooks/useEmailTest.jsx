import { useState } from "react";

function useEmailTest() {
  const [isFailed, setIsFailed] = useState({
    checkEmailError: false,
    emailGuide: "",
  });

  const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,6}$/i;

  function emailTest(emailId) {
    checkEmail.test(emailId)
      ? setIsFailed({ checkEmailError: false })
      : setIsFailed({
          checkEmailError: true,
          emailGuide: "@을 포함한 이메일 주소를 입력하세요",
        });
    return isFailed;
  }
  return { emailTest, isFailed };
}

export default useEmailTest;
