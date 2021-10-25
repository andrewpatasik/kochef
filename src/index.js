import main from './script/main';

if (window.localStorage) {
  if (!localStorage.getItem('userLoginSession')) {
    localStorage.setItem('userLoginSession', JSON.stringify({
      name: 'Andrew',
      isLoggedIn: false,
    }));
  }
}
main();
