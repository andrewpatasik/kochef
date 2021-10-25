// eslint-disable-next-line import/no-cycle
import router from '../script/router';

class Login extends HTMLElement {
  connectedCallback() {
    console.log('login rendered.');
    this.classList.add('grid');
    this.classList.add('grid-row-6');
    this.classList.add('h-screen');
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="row-span-auto flex flex-col justify-end items-center">
        <h1 class="font-sans text-4xl">Kochef</h1>
      </section>

      <section class="row-span-4 flex flex-col justify-center items-center">
        <div class="w-3/5">
          <label for="username" class="text-gray-400 text-sm font-medium">username:</label>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute mt-2 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <input type="text" class="block w-full h-9 border-2 border-gray-200 rounded-sm pl-8 text-sm" placeholder="your username here"></input>
        </div>
        <div class="w-3/5">
          <label for="username" class="text-gray-400 text-sm font-medium">password:</label>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute mt-2 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
          </svg>          
          <input type="password" class="block w-full h-9 border-2 border-gray-200 rounded-sm pl-8 text-sm" placeholder="your password here"></input>
        </div>
        <div class="flex justify-between w-3/5 text-xs text-gray-400 mt-1">
          <p>Register</p>
          <p>Forgot Password?</p>
        </div>
        <button id="login-btn" class="bg-blue-500 text-gray-100 p-2 w-3/5 rounded-sm mt-6">Login</button>
      </section>

      <section class="row-span-auto flex justify-between items-end text-sm text-blue-500 m-4">
        <p>Login with</p>
        <div class="flex font-medium">
          <p class="mr-3">Google</p>
          <p>Facebook</p>
        </div>
      </section>
    `;

    document.getElementById('login-btn').addEventListener('click', () => {
      const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
      localStorage.setItem('userLoginSession', JSON.stringify({ ...userLoginSession, isLoggedIn: !userLoginSession.isLoggedIn }));

      router('/');
    });
  }
}

customElements.define('login-element', Login);
