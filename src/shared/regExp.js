export const emailCheck_reg = (email) => {
  let _regId =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return _regId.test(email);
};

// 최소 8자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
export const passwordCheck_reg = (password) => {
  let _regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  return _regPassword.test(password);
};
