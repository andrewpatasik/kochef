import router from '../script/router';

class NavbarComponent extends HTMLElement {
  connectedCallback() {
    // console.log('navbar rendered.');
    this.classList.add('fixed');
    this.classList.add('w-full');
    this.classList.add('top-0');
    this.classList.add('flex');
    this.classList.add('justify-between');
    this.classList.add('items-start');
    this.classList.add('p-4');

    this.render();
  }

  render() {
    this.innerHTML = `
      <h3>My App</h3>

      <ul class="flex items-start text-xs text-gray-500">
      <a href="#" id="/">
        <li class="mx-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg> 
            <span>Home</span>
        </li>
      </a>

      <a href="#" id="/dashboard">
        <li class="mx-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            <span>My Dashboard</span> 
        </li>
      </a>

      <a href="#" id="/logout">
        <li class="mx-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
            </svg>
            <span>Logout</span>
        </li>
      </a>
    </ul>
    `;

    const elements = document.querySelectorAll('a');
    elements.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();

        const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
        localStorage.setItem('userLoginSession', JSON.stringify({ ...userLoginSession, isLoggedIn: false }));

        router(element.id);
      });
    });
  }
}

customElements.define('navbar-component', NavbarComponent);
