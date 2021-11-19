import historyState from '../script/historyState';
import router from '../script/router';

class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('fixed');
    this.classList.add('z-10');
    this.classList.add('justify-between');
    this.classList.add('items-center');
    this.classList.add('top-0');
    this.classList.add('p-2');
    this.classList.add('w-full');
    this.classList.add('h-16');
    this.classList.add('bg-white');

    this.render();

    const elements = document.querySelectorAll('a');
    elements.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        // save history stack for homepage
        if (this.getAttribute('home')) historyState.setState(window.location.pathname);

        if (element.id === 'back') {
          return !historyState.getStack().length > 0 ? router('/') : router(historyState.getState());
        }

        // if (element.id === 'menu') {
        //   console.log(element);
        //   element.querySelector('#dropdown-menu').classList.toggle('hidden');
        //   return null;
        // }

        if (element.id === '/logout') {
          const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
          localStorage.setItem('userLoginSession', JSON.stringify({ ...userLoginSession, isLoggedIn: !userLoginSession.isLoggedIn }));
        }
        return router(element.id);
      });
    });

    if (!this.getAttribute('home')) {
      this.querySelector('nav').addEventListener('click', () => {
        const dropdownMenu = this.querySelector('nav').querySelector('#dropdown-menu');
        dropdownMenu.classList.toggle('hidden');
      });
    }
  }

  render() {
    if (!this.getAttribute('home')) {
      this.innerHTML = `
        <div class="text-green-800">
          <a href="#" id="back">
            <div class="mx-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Kembali</span>
            </div>
          </a>     
        </div> 

        <nav class="relative flex flex-col items-start text-xs text-green-800">
          <div class="mx-1 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
          <ul id="dropdown-menu" class="absolute w-20 -bottom-16 -left-14 px-1 bg-green-200 shadow-md rounded-md hidden">
            <a href="#" id="/add-recipe">
              <li class="my-2">Buat Resep</li>
            </a>
            <a href="#" id="/logout">
            <li class="my-2">Logout</li>
            </a>
          </ul>
        </nav>
      `;
    } else {
      this.innerHTML = `
        <h3 class="text-green-800">Kochef</h3>

        <nav class="flex items-start text-xs text-green-800">
        <a href="#" id="/">
          <div class="mx-1 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg> 
              <span>Beranda</span>
          </div>
        </a>

        <a href="#" id="/dashboard">
          <div class="mx-1 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
              <span>Profil</span> 
          </div>
        </a>

        <a href="#" id="/logout">
          <div class="mx-1 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
              </svg>
              <span>Logout</span>
          </div>
        </a>
      </nav>
      `;
    }
  }
}

customElements.define('navbar-component', NavbarComponent);
