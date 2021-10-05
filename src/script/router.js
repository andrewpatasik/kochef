import '../view/home';
import '../view/login';
import '../view/dashboard';

const rootElement = document.querySelector('#app');

const routes = {
  '/': document.createElement('home-element'),
  '/login': document.createElement('login-element'),
  '/dashboard': document.createElement('dashboard-element'),
};

const changeUrlTo = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
};

const renderPage = (pathname) => {
  rootElement.append(routes[pathname]);
};

const router = (pathname) => {
  rootElement.innerHTML = '';

  if (pathname === '/logout') {
    changeUrlTo('/login');
    renderPage('/login');
  } else {
    changeUrlTo(pathname);
    renderPage(pathname);
  }

  window.addEventListener('popstate', () => {
    rootElement.innerHTML = '';

    renderPage(window.location.pathname);
  });
};

export default router;
