class Login extends HTMLElement {
  connectedCallback() {
    this.classList.add('grid');
    this.classList.add('grid-row-6');
    this.classList.add('h-screen');
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="row-span-auto flex flex-col justify-center items-center">
        <h1 class="font-serif text-4xl">My App</h1>
      </section>

      <section class="row-span-4 flex flex-col justify-center items-center">
        <div class="w-3/5">
          <label for="username" class="text-gray-400 text-sm font-medium">username:</label>
          <input type="text" class="block w-full h-8 border-2 border-gray-200 rounded-sm pl-1"></input>
        </div>
        <div class="w-3/5">
          <label for="username" class="text-gray-400 text-sm font-medium">password:</label>
          <input type="text" class="block w-full h-8 border-2 border-gray-200 rounded-sm pl-1"></input>
        </div>
        <div class="flex justify-between w-3/5 text-xs text-gray-400 mt-1">
          <p>Register</p>
          <p>Forgot Password?</p>
        </div>
        <button id="login-btn" class="bg-blue-500 text-gray-100 p-2 w-1/2 rounded-sm mt-6">Login</button>
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
      userLoginSession.logStatus = !userLoginSession.logStatus;
      localStorage.setItem('userLoginSession', JSON.stringify(userLoginSession));

      window.location.replace(`${window.location.origin}`);
    });
  }
}

customElements.define('login-element', Login);
