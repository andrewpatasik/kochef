/* eslint-disable class-methods-use-this */
import '../component/NavbarComponent';
import '../component/SearchComponent';
import '../component/RecipeCardComponent';
import fetchUserData from '../data/fetchUserData';

class Dashboard extends HTMLElement {
  // eslint-disable-next-line consistent-return
  async loadUserRecipes() {
    try {
      if (window.localStorage) {
        const userRecipeFromStorage = await JSON.parse(window.localStorage.getItem('savedRecipe'));
        if (userRecipeFromStorage && userRecipeFromStorage.length) {
          return userRecipeFromStorage;
        }
      }
    } catch (error) {
      return error;
    }
  }

  async loadUserData(userUrl) {
    return fetchUserData(userUrl)
      .then((result) => result[0])
      .catch((errorMessage) => errorMessage);
  }

  loadSkeleton() {
    for (let index = 0; index < 3; index += 1) {
      const recipeCardElement = document.createElement('recipe-card');

      recipeCardElement.setAttribute('img-border', 'rounded-md');
      recipeCardElement.classList.add('w-auto');
      recipeCardElement.classList.add('h-52');
      recipeCardElement.classList.add('m-2');

      this.appendChild(recipeCardElement);
    }
  }

  loadRecipe(recipeData) {
    recipeData.forEach((data) => {
      const recipeCardElement = document.createElement('recipe-card');
      recipeCardElement.cardDetail = data;

      recipeCardElement.setAttribute('img-border', 'rounded-md');
      recipeCardElement.classList.add('w-auto');
      recipeCardElement.classList.add('h-52');
      recipeCardElement.classList.add('m-2');
      recipeCardElement.id = data.key;
      this.appendChild(recipeCardElement);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  disconnectedCallback() {
    this.userData = null;
    this.recipeData = null;
  }

  connectedCallback() {
    this.classList.add('block');
    this.classList.add('mt-16');
    this.render();

    this.loadUserData('?seed=e7a63a5dc765414f&exc=login,gender,dob,registered')
      .then((userData) => {
        this.userData = userData;
        this.render();
        this.loadUserRecipes()
          .then((recipeData) => {
            this.recipeData = recipeData;
            this.render();
          }).catch((errorMessage) => {
            console.error(`loadUserRecipeError ${errorMessage}`);
          });
      }).catch((errorMessage) => {
        console.error(`loadUserDataError ${errorMessage}`);
      });
  }

  render() {
    if (!this.userData) {
      this.innerHTML = `
        <navbar-component></navbar-component>
        <section id="user-hero-skeleton" class="flex flex-wrap items-center justify-evenly w-full h-full p-2 animate-pulse">
          <div class="rounded-full w-24 h-24 mb-2 bg-gray-400"></div>
          <div id="user-bio" class="w-1/2 h-3/4">
            <div class="w-3/4 h-4 bg-gray-400 my-2"></div>
            <div class="w-1/2 h-4 bg-gray-400 my-2"></div>
          </div>
          <ul class="flex w-full h-full justify-evenly my-2">
            <li class="w-1/3 h-full p-2">
              <div class="w-full h-4 bg-gray-400 my-2"></div>
              <div class="w-16 h-16 bg-gray-400 m-auto"></div>
            </li>
            <li class="w-1/3 h-full p-2">
              <div class="w-full h-4 bg-gray-400 my-2"></div>
              <div class="w-16 h-16 bg-gray-400 m-auto"></div>
            </li>
            <li class="w-1/3 h-full p-2">
              <div class="w-full h-4 bg-gray-400 my-2"></div>
              <div class="w-16 h-16 bg-gray-400 m-auto"></div>
            </li>
          </ul>
        </section>
        <div class="flex items-center justify-evenly w-full h-20 p-2 animate-pulse">
          <div class="w-3/4 h-6 m-2 bg-gray-400"></div> 
          <div class="w-1/2 h-6 m-2 bg-gray-400"></div> 
        </div>
      `;
      this.loadSkeleton();
    } else {
      const { name, location, picture } = this.userData;

      this.innerHTML = `
        <navbar-component></navbar-component>
        <section id="user-hero" class="flex flex-wrap items-center justify-evenly w-full h-3/4 p-2 bg-yellow-100 text-green-800 shadow-lg">
          <img src="${picture.large}"  alt="user-avatar" class="rounded-full w-24 h-24 mb-2"/>
          <div id="user-bio">
            <h2>${name.first.concat(' ', name.last)}</h2>
            <p>${location.city}</p>
          </div>
          <ul class="flex w-full justify-evenly my-2 text-center">
            <li>
              <span>Resep Dibuat</span> 
              <h2>10</h2>
            </li>
            <li>
              <span>Resep Disimpan</span> 
              <h2>20</h2>
            </li> 
            <li>
              <span>Suka</span> 
              <h2>201</h2>
            </li>            
          </ul>
        </section>
        <div class="w-full h-20 flex items-center justify-evenly p-2">
          <searchbar-component></searchbar-component>
          <select id="filter-component" class="bg-white p-2 rounded-lg shadow-lg w-1/3 text-sm text-gray-400">
          <option>Filter resep</option>
            <option>Resep Dibuat</option>
            <option>Resep Disimpan</option>
          </select>
        </div>
        <h3 class="mx-4 tracking-wide">Resep Disimpan</h3>
        `;
      if (!this.recipeData) {
        this.loadSkeleton();
      } else {
        this.loadRecipe(this.recipeData);
      }
    }
  }
}

customElements.define('dashboard-element', Dashboard);
