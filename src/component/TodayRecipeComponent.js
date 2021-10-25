/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import router from '../script/router';
import cacheRecipeData from '../data/cachedRecipeData';
import fetchRecipes from '../data/fetchRecipes';
import recipeData from '../data/RecipeData';
import './RecipeCardComponent';

class TodayRecipeComponent extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('bg-green-800');
    this.classList.add('items-center');
    this.classList.add('w-full');
    this.classList.add('h-72');
    this.classList.add('mb-8');

    this.render();

    if (window.localStorage) {
      const cached = JSON.parse(localStorage.getItem('userRecipeData')).today;

      if (cached && Object.keys(cached).length) {
        const cachedToday = JSON.parse(localStorage.getItem('userRecipeData')).today;

        recipeData.setState('today', cachedToday)
          .then((data) => {
            document.querySelector('recipe-card').cardDetail = { ...data[0] };
            this.querySelector('button').addEventListener('click', () => {
              router(`/recipe-details/:${data[0].key}`);
            });
          });
      } else {
        fetchRecipes('/api/recipes-length/?limit=1')
          .then((results) => {
            recipeData.setState('today', results)
              .then((data) => {
                document.querySelector('recipe-card').cardDetail = { ...data[0] };
                cacheRecipeData('today', data);
                this.querySelector('button').addEventListener('click', () => {
                  router(`/recipe-details/:${data[0].key}`);
                });
              });
          });
      }
    }
  }

  render() {
    this.innerHTML = `
      <recipe-card class="w-56 h-full" img-border="rounded-none"></recipe-card>
      <button class="flex flex-col items-center flex-grow text-yellow-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-xs">Detail Resep</span>
      </button>
    `;
  }
}

customElements.define('today-recipe', TodayRecipeComponent);
