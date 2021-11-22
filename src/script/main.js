/* eslint-disable no-unused-vars */
import router from './router';

const main = () => {
  const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
  const { isLoggedIn } = userLoginSession;

  if (!isLoggedIn) {
    router('/login');
  } else {
    router(window.location.pathname);
  }
};

export default main;
