import router from '../script/router';
import cacheRecipeData from '../data/cachedRecipeData';
import fetchRecipes from '../data/fetchRecipes';
import useState from '../data/useState';
import './RecipeCardComponent';

class TodayRecipeComponent extends HTMLElement {
  connectedCallback() {
    const [getTodayRecipeState, setTodayRecipeState] = useState();
    this.classList.add('flex');
    this.classList.add('bg-green-800');
    this.classList.add('items-center');
    this.classList.add('w-full');
    this.classList.add('h-72');
    this.classList.add('mb-8');

    this.render();

    if (window.localStorage) {
      const cachedToday = JSON.parse(localStorage.getItem('userRecipeData')).today;

      if (cachedToday && Object.keys(cachedToday).length) {
        setTodayRecipeState({ ...cachedToday });
        const todayRecipeState = getTodayRecipeState();

        document.querySelector('recipe-card').cardDetail = { ...todayRecipeState };
        this.querySelector('button').addEventListener('click', () => {
          router(`/recipe-details/:${todayRecipeState.key}`);
        });
      } else {
        fetchRecipes('/api/recipes-length/?limit=1')
          .then((results) => {
            setTodayRecipeState({ ...results[0] });
            const todayRecipeState = getTodayRecipeState();

            document.querySelector('recipe-card').cardDetail = { ...todayRecipeState };
            this.querySelector('button').addEventListener('click', () => {
              router(`/recipe-details/:${todayRecipeState.key}`);
            });

            cacheRecipeData(todayRecipeState, {
              storageName: 'userRecipeData',
              category: 'today',
            });
          });
      }
    }
  }

  render() {
    this.innerHTML = `
      <recipe-card class="w-56 h-full" img-border="rounded-none"></recipe-card>
      <button class="flex flex-col items-center flex-grow text-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-xs">Detail Resep</span>
      </button>
    `;
  }
}

customElements.define('today-recipe', TodayRecipeComponent);
