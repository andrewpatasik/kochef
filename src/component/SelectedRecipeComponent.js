/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import './RecipeCardComponent';
import cacheRecipeData from '../data/cachedRecipeData';
import fetchRecipes from '../data/fetchRecipes';
import recipeData from '../data/RecipeData';

class SelectedRecipeComponent extends HTMLElement {
  constructor() {
    super();

    this.populateContent = this.populateContent.bind(this);
  }

  connectedCallback() {
    this.classList.add('w-full');
    this.classList.add('h-60');
    this.classList.add('flex');
    this.classList.add('flex-nowrap');
    this.classList.add('overflow-auto');

    this.render();

    this.initObserver(this.populateContent);
  }

  initObserver(exec) {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    }

    let callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          exec();
        }
      })
    }

    let observer = new IntersectionObserver(callback, options);

    let target = this;
    observer.observe(target);
  }

  populateContent() {
    if (window.localStorage) {
      const cached = JSON.parse(localStorage.getItem('userRecipeData')).selected;
      if (cached && cached.length) {
        const cachedSelected = JSON.parse(localStorage.getItem('userRecipeData')).selected;

        recipeData.setState('selected', cachedSelected)
          .then((data) => {
            this.data = data;
            this.render();
          });
      } else {
        fetchRecipes('/api/categorys/recipes/masakan-hari-raya')
          .then((results) => {
            recipeData.setState('selected', results)
              .then((data) => {
                this.data = data;
                this.render();
                cacheRecipeData('selected', data);
              });
          });
      }
    }
  }

  render() {
    this.innerHTML = '';

    if (this.data) {
      this.data.forEach((data) => {
        const recipeCardElement = document.createElement('recipe-card');
        recipeCardElement.cardDetail = data;

        recipeCardElement.setAttribute('img-border', 'rounded-md');
        recipeCardElement.classList.add('w-72');
        recipeCardElement.classList.add('h-52');
        recipeCardElement.classList.add('m-2');
        recipeCardElement.id = data.key;
        this.appendChild(recipeCardElement);
      });
    } else {
      for (let index = 0; index < 3; index++) {
        const recipeCardElement = document.createElement('recipe-card');

        recipeCardElement.setAttribute('img-border', 'rounded-md');
        recipeCardElement.classList.add('w-72');
        recipeCardElement.classList.add('h-52');
        recipeCardElement.classList.add('m-2');

        this.appendChild(recipeCardElement);
      }
    }
  }
}

customElements.define('selected-recipe', SelectedRecipeComponent);
