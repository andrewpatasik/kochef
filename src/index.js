import main from './script/main';

window.addEventListener('DOMContentLoaded', () => {
  if (window.localStorage) {
    if (!localStorage.getItem('userLoginSession')) {
      localStorage.setItem('userLoginSession', JSON.stringify({
        name: 'Andrew',
        logStatus: false,
      }));
    }
  }

  main();
  console.log('loaded');
});
