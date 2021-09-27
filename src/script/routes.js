import '../view/home';
import '../view/login';

const routes = {
  '/': document.createElement('home-element'),
  // eslint-disable-next-line quote-props
  '/login': document.createElement('login-element'),
};

export default routes;
