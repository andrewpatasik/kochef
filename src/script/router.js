import historyState from './historyState';

const rootElement = document.querySelector('#app');

const routes = [
  {
    pathname: '/',
    param: null,
    moduleName: 'home',
    componentName: 'home-element',
  },
  {
    pathname: '/login',
    param: null,
    moduleName: 'login',
    componentName: 'login-element',
  },
  {
    pathname: '/dashboard',
    param: null,
    moduleName: 'dashboard',
    componentName: 'dashboard-element',
  },
  {
    pathname: '/recipe-details',
    param: null,
    moduleName: 'recipeDetails',
    componentName: 'recipe-details',
  },
  {
    pathname: '/search',
    param: null,
    moduleName: 'search',
    componentName: 'search-result',
  },
  {
    pathname: '/404',
    param: null,
    moduleName: '404',
    componentName: 'not-found',
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
      {},
      pathname,
      `${window.location.origin + foundMatch.pathname}?q=${foundMatch.param}`,
    );

    return foundMatch;
  }

  if (!foundMatch.param) {
    window.history.pushState(
      {
        prevState: historyState.getStack(),
      },
      pathname,
      window.location.origin + foundMatch.pathname,
    );
  } else {
    window.history.pushState(
      {
        prevState: historyState.getStack(),
      },
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
    moduleName,
    componentName,
  } = prop;

  import(`../view/${moduleName}`)
    .then(() => {
      const component = document.createElement(componentName);
      if (pathname === '/recipe-details') {
        component.id = param;
        rootElement.append(component);
      } else {
        rootElement.append(component);
      }
    });
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
