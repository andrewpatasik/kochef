import routes from './routes';

const main = () => {
  const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
  const rootElement = document.getElementById('app');
  if (!userLoginSession.logStatus) {
    rootElement.appendChild(routes['/login']);

    window.history.pushState(
      {},
      '/login',
      `${window.location.origin}/login`,
    );
  } else {
    window.history.pushState(
      {},
      '/',
      `${window.location.origin}/`,
    );

    rootElement.appendChild(routes[window.location.pathname]);
  }
};

export default main;
