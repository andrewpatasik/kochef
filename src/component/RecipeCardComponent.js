/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import router from '../script/router';

class RecipeCardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['img-border'];
  }

  set cardDetail(data) {
    this._data = data;
    this.render();
  }

  connectedCallback() {
    this.classList.add('relative');
    this.classList.add('z-0');
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('flex-shrink-0');
    this.classList.add('bg-yellow-50');

    this.render();

    if (this.id) {
      this.addEventListener('click', () => {
        router(`/recipe-details/:${this.id}`);
      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  render() {
    this.innerHTML = '';

    if (this._data) {
      const {
        title,
        thumb,
        times,
        portion,
        dificulty,
      } = this._data;

      this.innerHTML = `
        <img src=${thumb} alt="recipe-illustration" class="absolute w-full h-full object-cover filter brightness-75"/>
        <section class="absolute flex flex-col justify-end w-full h-full p-2">
          <h2 class="text-lg text-yellow-200 text-shadow-md my-1 leading-none tracking-wider">${title}</h2>
          <ul class="flex flex-wrap items-end w-full text-xs text-yellow-200 text-shadow-md">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <p>${times}</p>
            </li>
  
            <li class="flex items-center mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <p>${portion}</p>
            </li>
            
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <p>${dificulty}</p>
            </li>
          </ul>       
      </section>
      `;

      this.querySelector('img').classList.add(this.getAttribute('img-border'));
    } else {
      this.innerHTML = `
      <div class="animate-pulse flex flex-col w-full h-full justify-end border border-gray-400 p-2">
        <div class="h-full bg-gray-400 mb-2"></div>
        <div class="h-4 bg-gray-400 mb-2"></div>
        <div class="h-4 bg-gray-400 w-3/4"></div>
      </div>
      `;
    }
  }
}

customElements.define('recipe-card', RecipeCardComponent);
