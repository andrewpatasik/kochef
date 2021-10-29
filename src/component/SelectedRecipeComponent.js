import './RecipeCardComponent';
import cacheRecipeData from '../data/cachedRecipeData';
import fetchRecipes from '../data/fetchRecipes';
import useState from '../data/useState';

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
    const target = this;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          exec();
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(target);
  }

  populateContent() {
    const [getSelectedRecipeState, setSelectedRecipeState] = useState();

    if (window.localStorage) {
      const cachedSelected = JSON.parse(localStorage.getItem('userRecipeData')).selected;
      if (cachedSelected && cachedSelected.length) {
        setSelectedRecipeState([...cachedSelected]);
        const selectedRecipeState = getSelectedRecipeState();

        this.data = selectedRecipeState;
        this.render();
      } else {
        fetchRecipes('/api/categorys/recipes/masakan-hari-raya')
          .then((results) => {
            setSelectedRecipeState([...results]);
            const selectedRecipeState = getSelectedRecipeState();

            this.data = selectedRecipeState;
            this.render();

            cacheRecipeData('selected', selectedRecipeState);
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
      for (let index = 0; index < 3; index += 1) {
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
