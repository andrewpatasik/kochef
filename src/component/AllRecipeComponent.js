/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import './RecipeCardComponent';

class AllRecipeComponent extends HTMLElement {
  connectedCallback() {
    this.classList.add('grid');
    this.classList.add('grid-cols-1');
    this.classList.add('h-full');
    this.classList.add('overflow-scroll');

    this.render();
  }

  set recipeCardData(data) {
    this._data = data || [];

    this.render();
  }

  render() {
    this.innerHTML = '';

    if (this._data) {
      this._data.forEach((data) => {
        const recipeCardElement = document.createElement('recipe-card');
        recipeCardElement.cardDetail = data;

        recipeCardElement.setAttribute('img-border', 'rounded-md');
        recipeCardElement.classList.add('w-auto');
        recipeCardElement.classList.add('h-52');
        recipeCardElement.classList.add('shadow-md');
        recipeCardElement.classList.add('m-2');
        recipeCardElement.id = data.key;

        this.appendChild(recipeCardElement);
      });
    } else {
      for (let index = 0; index < 3; index++) {
        const recipeCardElement = document.createElement('recipe-card');

        recipeCardElement.setAttribute('img-border', 'rounded-md');
        recipeCardElement.classList.add('w-auto');
        recipeCardElement.classList.add('h-52');
        recipeCardElement.classList.add('shadow-md');
        recipeCardElement.classList.add('rounded-md');
        recipeCardElement.classList.add('m-2');

        this.appendChild(recipeCardElement);
      }
    }
  }
}

customElements.define('all-recipe', AllRecipeComponent);
