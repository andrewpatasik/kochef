/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import '../component/RecipeCardComponent';
import '../component/SliderComponent';
import fakeDetailsData from '../data/fakeDetailsData.json';
import useState from '../data/useState';
import '../component/NavbarComponent';
import fetchRecipes from '../data/fetchRecipes';
import saveRecipe from '../data/saveRecipe';

class RecipeDetails extends HTMLElement {
  disconnectedCallback() {
    this.details = null;
  }

  connectedCallback() {
    if (window.localStorage) {
      if (!window.localStorage.getItem('savedRecipe')) {
        this.isSaved = false;
      } else {
        const recipeFromStorage = JSON.parse(window.localStorage.getItem('savedRecipe'));
        const recipeKey = this.getAttribute('id');
        this.isSaved = recipeFromStorage.some((recipe) => recipe.key === recipeKey);
      }
    }
    const [getRecipeDetailState, setRecipeDetailState] = useState();

    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('pt-16');
    this.classList.add('w-full');
    this.classList.add('h-screen');

    this.render();

    fetchRecipes(`/api/recipe/:${this.getAttribute('id')}`)
      .then((result) => {
        setRecipeDetailState({ ...result });
        const recipeDetailState = getRecipeDetailState();
        this.details = recipeDetailState;
        this.render();

        this.querySelector('#bookmark').addEventListener('click', () => {
          const iconContainer = this.querySelector('#bookmark');
          const icon = iconContainer.firstElementChild;
          iconContainer.classList.toggle('text-gray-400');
          iconContainer.classList.toggle('text-red-700');
          iconContainer.classList.toggle('saved');
          this.isSaved = !this.isSaved;
          if (this.isSaved) {
            icon.classList.add('animate-ping');
            setTimeout(() => {
              icon.classList.remove('animate-ping');
            }, 700);
          }
          saveRecipe({ ...this.details, key: this.getAttribute('id') }, {
            caches: true,
          });
        });
      });
  }

  render() {
    if (this.details) {
      const {
        thumb,
        title,
        servings,
        times,
        dificulty,
        author,
        ingredient,
        step,
      } = this.details;

      this.innerHTML = '';

      this.innerHTML = `
        <navbar-component></navbar-component>
        <recipe-card img-border="rounded-none" class="w-full h-44 top-0"></recipe-card>
        <section class="flex justify-start justify-between items-center m-2">
          <div id="author-detail" class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-green-700 mr-2 flex justify-center items-center">
              <span class="text-md font-bold text-white">${author.user.slice(0, 1)}</span>
            </div>
            <h5>${author.user}</h5>       
          </div> 
          <div id="bookmark" class="${!this.isSaved ? 'text-gray-400' : 'text-red-700'}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>          
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>             
          </div>
        </section>
        <section id="details-ingredients" class="flex flex-col px-2 w-full h-44 mb-2">
          <h5>Bahan Baku</h5>
          <ul class="text-sm overflow-auto my-1 text-gray-800">
            ${ingredient.map((bahan, index) => `<li class="p-1 ${index % 2 === 0 ? 'bg-green-200' : 'bg-green-100'}">${bahan}</li>`).join('')}
          </ul>
        </section>
        <section id="step-ingredients" class="flex flex-col flex-grow px-2 w-full h-auto">
          <h5>Cara Membuat</h5>
          <step-slider></step-slider>
        </section>
      `;

      this.querySelector('recipe-card').cardDetail = {
        title,
        thumb,
        times,
        portion: servings,
        dificulty,
      };

      this.querySelector('step-slider').sliderData = step;
    } else {
      this.innerHTML = `
      <navbar-component></navbar-component>
      <div class="animate-pulse">
        <recipe-card img-border="rounded-none" class="w-full h-44 top-0"></recipe-card>
        <section id="details-author" class="flex items-center m-2">
          <div class="w-10 h-10 rounded-full bg-gray-400 mr-2"></div>
          <div class="w-1/4 h-4 bg-gray-400"></div>
        </section>
        <section id="details-ingredients" class="flex flex-col px-2 w-full h-44 mb-2">
          <div class="w-1/3 h-4 bg-gray-400 mb-2"></div>
          <div class="h-14 bg-gray-400 mb-2"></div>
          <div class="h-14 bg-gray-400 mb-2"></div>
          <div class="h-14 bg-gray-400 mb-2"></div>
        </section>
        <section id="step-ingredients" class="flex flex-col flex-grow px-2 w-full h-1/3">
          <div class="w-1/3 h-4 bg-gray-400 mb-2"></div>
          <div class="h-full bg-gray-400 mb-2"></div>
        </section>
      </div>
      `;
    }
  }
}

customElements.define('recipe-details', RecipeDetails);
