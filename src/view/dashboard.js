import '../component/NavbarComponent';
import '../component/RecipeCardComponent';
import '../component/SearchComponent';
import fetchUserData from '../data/fetchUserData';
import cacheRecipeData from '../data/cachedRecipeData';
import CreateDOM from '../script/CreateDom';

class Dashboard extends HTMLElement {
  // eslint-disable-next-line class-methods-use-this
  async fetchUserRecipes() {
    try {
      if (window.localStorage) {
        const userRecipeFromStorage = await JSON.parse(window.localStorage.getItem('userCache')).saved;
        return userRecipeFromStorage;
      }
      return 'your browser does not support localStorage';
    } catch (error) {
      return error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async loadUserData(userUrl) {
    try {
      const userData = await fetchUserData(userUrl)
        .then((result) => result[0])
        .catch((errorMessage) => errorMessage);
      return userData;
    } catch (error) {
      return error;
    }
  }

  loadRecipeCard(recipeData) {
    if (!recipeData) {
      for (let index = 0; index < 3; index += 1) {
        const recipeCardElement = CreateDOM('recipe-card');

        recipeCardElement.setElementAttribute({
          name: 'img-border',
          values: ['rounded-md'],
        });

        recipeCardElement.setElementAttribute({
          name: 'class',
          values: ['w-auto', 'h-52', 'm-2'],
        });
        this.querySelector('#user-recipe-list').appendChild(recipeCardElement.getElement());
      }
    } else if (recipeData && recipeData.length > 0) {
      recipeData.forEach((data) => {
        const userRecipeContainer = CreateDOM('div');
        const recipeCardElement = CreateDOM('recipe-card');
        const deleteIcon = CreateDOM('div');

        userRecipeContainer.setElementAttribute({
          name: 'class',
          values: ['recipe-container', 'relative'],
        });

        recipeCardElement.setElementAttribute({
          name: 'id',
          values: [data.key],
        });
        recipeCardElement.setElementAttribute({
          name: 'img-border',
          values: ['rounded-md'],
        });
        recipeCardElement.setElementAttribute({
          name: 'class',
          values: ['w-auto', 'h-52', 'm-2'],
        });
        recipeCardElement.getElement().cardDetail = { ...data, portion: data.servings };

        deleteIcon.setElementAttribute({
          name: 'class',
          values: [
            'delete-icon',
            'bg-white',
            'text-gray-400',
            'p-1',
            'rounded-full',
            'absolute',
            'right-5',
            'top-5',
          ],
        });
        deleteIcon.getElement().innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        `;

        userRecipeContainer.getElement()
          .append(recipeCardElement.getElement(), deleteIcon.getElement());
        this.querySelector('#user-recipe-list').appendChild(userRecipeContainer.getElement());

        deleteIcon.getElement().addEventListener('click', () => {
          const recipeId = recipeCardElement.getElement().id;
          const recipeIndex = this.recipeData
            .findIndex((recipe) => recipe.key === recipeId);

          const updatedRecipeData = [...this.recipeData];
          updatedRecipeData.splice(recipeIndex, 1);

          cacheRecipeData(updatedRecipeData, {
            storageName: 'userCache',
            category: 'saved',
          });
          this.fetchUserRecipes()
            .then((updatedRecipe) => {
              this.recipeTotal = this.getRecipeTotal();
              this.recipeData = updatedRecipe;
              this.render();
            });
        });
      });
    } else {
      const noRecipe = CreateDOM('h2');
      noRecipe.getElement().innerText = 'Tidak Ada Resep';
      noRecipe.setElementAttribute({
        name: 'class',
        values: ['self-center', 'text-green-800'],
      });
      this.querySelector('#user-recipe-list').appendChild(noRecipe.getElement());
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getRecipeTotal() {
    if (window.localStorage) {
      const userRecipeList = JSON.parse(window.localStorage.getItem('userCache'));
      return userRecipeList;
    }
    return null;
  }

  disconnectedCallback() {
    this.userData = null;
    this.recipeData = null;
  }

  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('pt-16');
    this.classList.add('min-h-screen');
    this.render();

    this.loadUserData('?seed=e7a63a5dc765414f&exc=login,gender,dob,registered')
      .then((userData) => {
        this.userData = userData;
        this.fetchUserRecipes()
          .then((recipeData) => {
            this.recipeTotal = this.getRecipeTotal();
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
              <div class="w-16 h-12 bg-gray-400 m-auto"></div>
            </li>
            <li class="w-1/3 h-full p-2">
              <div class="w-full h-4 bg-gray-400 my-2"></div>
              <div class="w-16 h-12 bg-gray-400 m-auto"></div>
            </li>
            <li class="w-1/3 h-full p-2">
              <div class="w-full h-4 bg-gray-400 my-2"></div>
              <div class="w-16 h-12 bg-gray-400 m-auto"></div>
            </li>
          </ul>
        </section>
        <div class="flex items-center justify-evenly w-full h-20 p-2 animate-pulse">
          <div class="w-3/4 h-6 m-2 bg-gray-400"></div> 
          <div class="w-1/2 h-6 m-2 bg-gray-400"></div> 
        </div>
        <section id="user-recipe-list"></section>
      `;
      this.loadRecipeCard();
    } else {
      const { name, location, picture } = this.userData;

      this.innerHTML = `
        <navbar-component></navbar-component>
        <section id="user-hero" class="flex flex-wrap items-center justify-evenly w-full h-3/4 p-2 bg-white text-green-800 shadow-lg">
          <img src="${picture.large}"  alt="user-avatar" class="rounded-full w-24 h-24 mb-2"/>
          <div id="user-bio">
            <h2>${name.first.concat(' ', name.last)}</h2>
            <p>${location.city}</p>
          </div>
          <ul class="flex w-full justify-evenly my-2 text-center">
            <li>
              <span>Resep Dibuat</span> 
              <h2>${!this.recipeTotal.created ? '0' : this.recipeTotal.created.length}</h2>
            </li>
            <li>
              <span>Resep Disimpan</span> 
              <h2>${!this.recipeTotal.saved ? '0' : this.recipeTotal.saved.length}</h2>
            </li> 
            <li>
              <span>Suka</span> 
              <h2>${!this.recipeTotal.likes ? '0' : this.recipeTotal.likes.length}</h2>
            </li>            
          </ul>
        </section>
        <div class="w-full h-20 flex items-center justify-evenly p-2">
          <searchbar-component class="bg-white"></searchbar-component>
          <select id="filter-component" class="bg-white p-2 rounded-lg shadow-lg w-1/3 text-sm text-gray-400">
          <option>Filter resep</option>
            <option>Resep Dibuat</option>
            <option>Resep Disimpan</option>
          </select>
        </div>
        <h3 class="mx-4 tracking-wide">Resep Disimpan</h3>
        <section id="user-recipe-list" class="flex flex-col flex-1 justify-center"></section>
        `;
      this.loadRecipeCard(this.recipeData);
    }
  }
}

customElements.define('dashboard-element', Dashboard);
