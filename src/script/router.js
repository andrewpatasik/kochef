import '../view/home';
import '../view/login';
import '../view/dashboard';
import '../view/search';
import '../view/recipeDetails';
import '../view/404';

const rootElement = document.querySelector('#app');

const routes = [
  {
    pathname: '/',
    param: null,
    component: document.createElement('home-element'),
  },
  {
    pathname: '/login',
    param: null,
    component: document.createElement('login-element'),
  },
  {
    pathname: '/dashboard',
    param: null,
    component: document.createElement('dashboard-element'),
  },
  {
    pathname: '/recipe-details',
    param: null,
    component: document.createElement('recipe-details'),
  },
  {
    pathname: '/search',
    param: null,
    component: document.createElement('search-result'),
  },
  {
    pathname: '/404',
    param: null,
    component: document.createElement('not-found'),
  },
];

const urlMatcher = (pathname) => {
  let matches = null;

  let foundMatch = routes.find((route) => {
    if (route.pathname.slice(1).length === pathname.slice(1).length) {
      matches = route;
    }

    return matches;
  });

  // if nothing match then check for parameterized url
  if (!foundMatch) {
    let param = pathname.split('/');
    matches = routes.find((route) => route.pathname.slice(1).length === param[1].length);
    param = param.find((index) => index.includes(':'));

    foundMatch = { ...matches, param: param.slice(1) };
  }

  if (foundMatch.pathname === '/search') {
    window.history.pushState(
      {
        prevState: window.location.pathname,
      },
      pathname,
      `${window.location.origin + foundMatch.pathname}?q=${foundMatch.param}`,
    );

    return foundMatch;
  }

  if (!foundMatch.param) {
    window.history.pushState(
      {
        prevState: window.location.pathname,
      },
      pathname,
      window.location.origin + foundMatch.pathname,
    );
  } else {
    window.history.pushState(
      {},
      pathname,
      `${window.location.origin + foundMatch.pathname}/${foundMatch.param}`,
    );
  }

  return foundMatch;
};

const loadPage = (prop) => {
  const {
    pathname,
    param,
    component,
  } = prop;

  if (pathname === '/recipe-details') {
    component.id = param;
    rootElement.append(component);
  } else {
    rootElement.append(component);
  }
};

const router = (pathname) => {
  rootElement.innerHTML = '';

  if (pathname === '/logout') {
    const pageProperties = urlMatcher('/login');
    loadPage(pageProperties);
  } else {
    const pageProperties = urlMatcher(pathname);
    loadPage(pageProperties);
  }

  window.addEventListener('popstate', () => {
    rootElement.innerHTML = '';

    // how to get param?
    let pageProperties = routes.find((route) => {
      if (route.pathname === window.location.pathname) {
        return route;
      }
      return null;
    });

    if (!pageProperties) {
      const param = window.location.pathname.split('/');
      pageProperties = routes.find((route) => route.pathname.slice(1).length === param[1].length);

      pageProperties = { ...pageProperties, param: param[2] };
    }

    loadPage(pageProperties);
  });
};

export default router;
