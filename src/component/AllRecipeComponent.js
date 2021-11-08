import './RecipeCardComponent';
import './LoadingIndicatorComponent';
import fakeData from '../data/fakeData.json';
import useState from '../data/useState';

class AllRecipeComponent extends HTMLElement {
  constructor() {
    super();

    const [getAllRecipeState, setAllRecipeState] = useState([]);
    this.getAllRecipeState = getAllRecipeState;
    this.setAllRecipeState = setAllRecipeState;
  }

  initObserver() {
    const target = this.lastChild;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.75,
    };

    const handlePaginationEvent = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.populatePage(fakeData)
            .then(() => {
              setTimeout(() => {
                this.render();
                const paginationObserver = this.initObserver();
                paginationObserver.startObserve();
              }, 1500);
            });
        }
      });
    };

    const observer = new IntersectionObserver(handlePaginationEvent, options);

    const startObserve = () => {
      observer.observe(target);
    };

    const stopObserve = () => {
      observer.unobserve(target);
    };

    return { startObserve, stopObserve };
  }

  async populatePage(recipeData) {
    let newRecipeData = this.getAllRecipeState();
    newRecipeData = newRecipeData.concat(recipeData);

    await this.setAllRecipeState([...newRecipeData]);
    const allRecipeState = this.getAllRecipeState();
    this.data = allRecipeState;
  }

  disconnectedCallback() {
    const paginationObserver = this.initObserver();
    paginationObserver.stopObserve();

    this.setAllRecipeState([]);
  }

  connectedCallback() {
    this.classList.add('grid');
    this.classList.add('grid-cols-1');
    this.classList.add('h-full');
    this.classList.add('overflow-scroll');

    this.render();

    this.populatePage(fakeData)
      .then(() => {
        setTimeout(() => {
          this.render();
          const paginationObserver = this.initObserver();
          paginationObserver.startObserve();
        }, 1500);
      });
  }

  render() {
    this.innerHTML = '';

    if (this.data) {
      this.data.forEach((data) => {
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

      const loadingIndicator = document.createElement('loading-indicator');
      this.appendChild(loadingIndicator);
    } else {
      for (let index = 0; index < 3; index += 1) {
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
