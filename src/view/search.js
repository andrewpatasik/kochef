import '../component/NavbarComponent';
import '../component/RecipeCardComponent';
import '../component/LoadingIndicatorComponent';
import fetchRecipes from '../data/fetchRecipes';
import useState from '../data/useState';
// import fakeSearchResultData from '../data/fakeSearchResultData.json';

class Search extends HTMLElement {
  constructor() {
    super();

    this.page = 1;
    this.startIndex = 0;
    this.endOfPage = false;
    this.searchResultsData = [];
    this.lastSearchResultData = [];
  }

  getSearchResult(page) {
    let currentIndex = this.startIndex;
    const limit = 10;
    const endIndex = page * limit;
    const nextIndex = endIndex + 1;
    const accumulator = [];
    const dataLen = this.searchResultsData.length;

    if (this.endOfPage) {
      return accumulator;
    }

    for (currentIndex; currentIndex <= endIndex; currentIndex += 1) {
      if (currentIndex === dataLen) {
        this.endOfPage = true;
        return accumulator;
      }
      accumulator.push(this.searchResultsData[currentIndex]);
    }

    this.startIndex = nextIndex;
    this.page += 1;

    return accumulator;
  }

  initObserver() {
    // last child is loading indicator
    const target = this.lastChild;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handlePaginationEvent = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const recipeData = this.getSearchResult(this.page);

          if (recipeData && recipeData.length > 0) {
            this.populateData(recipeData)
              .then(() => {
                setTimeout(() => {
                  this.render();
                  const paginationObserver = this.initObserver();
                  paginationObserver.startObserve();
                }, 1500);
              });
          } else {
            observer.unobserve(target);
            // remove loading indicator
            this.removeChild(this.lastChild);
          }
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

  // eslint-disable-next-line class-methods-use-this
  async populateData(recipeData) {
    const [getSearchResultState, setSearchResultState] = useState([]);

    let newRecipeData = this.lastSearchResultData;
    newRecipeData = newRecipeData.concat(recipeData);

    await setSearchResultState([...newRecipeData]);
    const searchResultState = getSearchResultState();
    this.data = searchResultState;
    this.lastSearchResultData = [...searchResultState];
  }

  disconnectedCallback() {
    this.startIndex = 0;
    this.page = 1;
    this.endOfPage = false;
    this.searchResultsData = [];
    this.lastSearchResultData = [];
    this.data = null;
    const paginationObserver = this.initObserver();
    paginationObserver.stopObserve();
  }

  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('w-full');
    this.classList.add('mt-16');

    this.render();

    const queryString = window.location.search;
    const queryParam = new URLSearchParams(queryString);
    const param = queryParam.get('q');

    // this.searchResultsData = [...fakeSearchResultData];
    fetchRecipes(`/api/search/?q=${param}`)
      .then((results) => {
        this.searchResultsData = [...results];
        const recipeData = this.getSearchResult(this.page);

        this.populateData(recipeData)
          .then(() => {
            this.render();
            const paginationObserver = this.initObserver();
            paginationObserver.startObserve();
          });
      });
  }

  render() {
    this.innerHTML = `
        <navbar-component></navbar-component>
        <div class="p-2 text-green-800">
          <h1>Hasil Pencarian</h1>
          <span>${this.data ? `${this.searchResultsData.length} resep ditemukan` : 'mencari resep, tunggu...'} </span>
        </div>
      `;

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
        recipeCardElement.classList.add('w-full');
        recipeCardElement.classList.add('h-52');
        recipeCardElement.classList.add('p-2');

        this.appendChild(recipeCardElement);
      }
    }
  }
}

customElements.define('search-result', Search);
