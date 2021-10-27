// eslint-disable-next-line import/no-cycle
import router from '../script/router';

class SearchComponent extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('items-center');
    this.classList.add('w-4/6');
    this.classList.add('self-center');
    this.classList.add('mx-auto');
    this.classList.add('p-2');
    this.classList.add('rounded-lg');
    this.classList.add('shadow-lg');
    this.classList.add('bg-white');

    this.render();

    this.querySelector('input').addEventListener('change', () => {
      const inputVal = this.querySelector('input').value;
      router(`/search/:${inputVal}`);
    });
  }

  render() {
    this.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-800" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
      </svg>      
      <input type="text" placeholder="Cari masakan..." class="outline-none pl-1"></input>
    `;
  }
}

customElements.define('searchbar-component', SearchComponent);
