import router from './router';

const main = () => {
  const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
  const { isLoggedIn } = userLoginSession;

  if (!isLoggedIn) {
    router('/login');
  } else {
    router('/');
  }
};

export default main;
