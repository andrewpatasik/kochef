import '../component/NavbarComponent';
import '../component/SearchComponent';
import '../component/TodayRecipeComponent';
import '../component/CategoryComponent';
import '../component/SelectedRecipeComponent';
import '../component/AllRecipeComponent';

class Home extends HTMLElement {
  constructor() {
    super();

    this.currentPage = 1;

    if (window.localStorage) {
      if (!localStorage.getItem('userRecipeData')) {
        localStorage.setItem('userRecipeData', JSON.stringify({
          today: {},
          selected: [],
        }));
      }
      if (!localStorage.getItem('userCache')) {
        localStorage.setItem('userCache', JSON.stringify({
          saved: [],
          created: [],
          likes: [],
        }));
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  disconnectedCallback() {
    //
  }

  connectedCallback() {
    window.scrollTo(0, 0);

    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('mt-16');

    this.render();
  }

  render() {
    this.innerHTML = '';

    this.innerHTML = `
      <navbar-component home="${true}"></navbar-component>
      <div class="w-full h-20 p-4 flex items-center justify-center">
        <searchbar-component home="${true}" class="w-full"></searchbar-component>
      </div>
      <div id="heading-component" class="w-full px-2 my-4">
        <h1 class="w-auto leading-none">Resep Hari Ini</h1>          
      </div>
      <today-recipe></today-recipe>
      <h3 class="mx-2 w-1/2 leading-none">Kategori Pilihan</h3>
      <category-component></category-component>
      <h3 class="mx-2 w-1/2 leading-none">Masakan Spesial Hari Raya</h3>
      <selected-recipe></selected-recipe>
      <h3 class="mx-2">Semua Resep</h3>
      <all-recipe></all-recipe>
      `;
  }
}

customElements.define('home-element', Home);
