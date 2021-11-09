/* eslint-disable class-methods-use-this */
import '../component/NavbarComponent'; import '../component/SearchComponent'; import '../component/RecipeCardComponent';
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
        const recipeCardElement = document.createElement('recipe-card');

        recipeCardElement.setAttribute('img-border', 'rounded-md');
        recipeCardElement.classList.add('w-auto');
        recipeCardElement.classList.add('h-52');
        recipeCardElement.classList.add('m-2');
        this.querySelector('#user-recipe-list').appendChild(recipeCardElement);
      }
    } else {
      recipeData.forEach((data) => {
        const userRecipeContainer = document.createElement('div');
        const recipeCardElement = document.createElement('recipe-card');
        const deleteIcon = document.createElement('div');

        deleteIcon.classList.add('delete-icon');
        deleteIcon.classList.add('bg-white');
        deleteIcon.classList.add('text-gray-400');
        deleteIcon.classList.add('p-1');
        deleteIcon.classList.add('rounded-full');
        deleteIcon.classList.add('absolute');
        deleteIcon.classList.add('right-4');
        deleteIcon.classList.add('top-3');
        deleteIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        `;

        userRecipeContainer.classList.add('recipe-container');
        userRecipeContainer.classList.add('relative');

        recipeCardElement.setAttribute('img-border', 'rounded-md');
        recipeCardElement.classList.add('w-auto');
        recipeCardElement.classList.add('h-52');
        recipeCardElement.classList.add('m-2');

        recipeCardElement.id = data.key;
        recipeCardElement.cardDetail = { ...data, portion: data.servings };

        userRecipeContainer.append(recipeCardElement, deleteIcon);
        this.querySelector('#user-recipe-list').appendChild(userRecipeContainer);
      });
    }
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
        setTimeout(() => {
          this.loadUserRecipes()
            .then((recipeData) => {
              this.recipeData = recipeData;
              this.render();
              const deleteIconElements = this.querySelectorAll('.delete-icon');
              deleteIconElements.forEach((icon) => {
                icon.addEventListener('click', () => {
                  const recipeId = icon.parentNode.querySelector('recipe-card').id;
                  console.log(recipeId);
                });
              });
            }).catch((errorMessage) => {
              console.error(`loadUserRecipeError ${errorMessage}`);
            });
        }, 1500);
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
        <section id="user-hero" class="flex flex-wrap items-center justify-evenly w-full h-3/4 p-2 bg-yellow-100 text-green-800 shadow-lg">
          <img src="${picture.large}"  alt="user-avatar" class="rounded-full w-24 h-24 mb-2"/>
          <div id="user-bio">
            <h2>${name.first.concat(' ', name.last)}</h2>
            <p>${location.city}</p>
          </div>
          <ul class="flex w-full justify-evenly my-2 text-center">
            <li>
              <span>Resep Dibuat</span> 
              <h2>${!this.recipeData ? '0' : this.recipeData.length}</h2>
            </li>
            <li>
              <span>Resep Disimpan</span> 
              <h2>${!this.recipeData ? '0' : this.recipeData.length}</h2>
            </li> 
            <li>
              <span>Suka</span> 
              <h2>${!this.recipeData ? '0' : this.recipeData.length}</h2>
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
        <section id="user-recipe-list"></section>
        `;
      this.loadRecipeCard(this.recipeData);
    }
  }
}

customElements.define('dashboard-element', Dashboard);
