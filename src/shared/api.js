import instance from './Request';

export const authApi = {
  signUp: (email, name, password, passwordCheck) => {
    instance
      .post('api_signup', {
        email: email,
        name: name,
        password: password,
        passwordCheck: passwordCheck,
      })
      .then((res) => {
        console.log(res);
        alert('회원가입에 성공했습니다!');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.log(err);
      });
  },

  login: (email, password) => {
    instance
      .post('api_login', {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('is_login', res.data.token);
        alert('로그인 되었습니다!');
        window.location.href = '/info';
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
