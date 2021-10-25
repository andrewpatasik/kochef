/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import '../component/RecipeCardComponent';
import '../component/SliderComponent';
import fakeDetailsData from '../data/fakeDetailsData.json';
import recipeDetailsData from '../data/RecipeDetailsData';
import '../component/NavbarComponent';
import fetchRecipes from '../data/fetchRecipes';

class RecipeDetails extends HTMLElement {
  disconnectedCallback() {
    this.details = null;
  }

  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('pt-16');
    this.classList.add('w-full');
    this.classList.add('h-screen');

    this.render();

    // fetch data based on recipeId
    fetchRecipes(`/api/recipe/:${this.getAttribute('id')}`)
      .then((result) => {
        recipeDetailsData.setState([result])
          .then((data) => {
            this.details = data;
            // this.details = data.find((details) => details.key === this.getAttribute('id'));
            this.render();
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
        <section id="details-author" class="flex items-center m-2">
          <div class="w-10 h-10 rounded-full bg-green-700 mr-2 flex justify-center items-center">
            <span class="text-md font-bold text-white">${author.user.slice(0, 1)}</span>
          </div>
          <h5>${author.user}</h5>
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
