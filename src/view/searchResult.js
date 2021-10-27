/* eslint-disable class-methods-use-this */
import '../component/NavbarComponent';
import '../component/RecipeCardComponent';
import '../component/LoadingIndicatorComponent';
// import fetchRecipes from '../data/fetchRecipes';
import searchResult from '../data/searchResultData';
import fakeSearchResultData from '../data/fakeSearchResultData.json';

class SearchResult extends HTMLElement {
  constructor() {
    super();

    this.page = 1;
    this.startIndex = 0;
    this.endOfPage = false;
    this.searchResultsData = [];
  }

  searchPagination(page) {
    while (!this.endOfPage) {
      const limit = 10;
      const accumulator = [];

      const endIndex = page * limit;
      const nextIndex = endIndex;
      const lastIndex = this.searchResultsData.length;

      let currentIndex = this.startIndex;

      for (currentIndex; currentIndex < endIndex; currentIndex += 1) {
        accumulator.push(this.searchResultsData[currentIndex]);
        if (currentIndex === lastIndex) {
          this.endOfPage = true;
          return;
        }
      }

      searchResult.setState(accumulator)
        .then((data) => {
          this.data = data;
          this.startIndex = nextIndex;
          this.page += 1;

          this.render();
        });

      return;
    }

    console.log('no data');
  }

  // initObserver() {

  // }

  disconnectedCallback() {
    this.startIndex = 0;
    this.page = 1;
    this.endOfPage = false;
  }

  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('w-full');
    this.classList.add('mt-16');

    this.render();
    // const queryString = window.location.search;
    // const urlParam = new URLSearchParams(queryString);
    // const searchParam = urlParam.get('q');

    // fetchRecipes(`/api/search/?q=${searchParam}`)
    //   .then((results) => {
    //     // store fetched data to DS
    //     this.searchResultsData = [...results];

    //     // implement pagination to display 10 recipes/page
    //     this.searchPagination(this.page);
    //   });

    this.searchResultsData = [...fakeSearchResultData];
    this.searchPagination(this.page);
  }

  render() {
    this.innerHTML = '';

    if (this.data) {
      this.innerHTML = `
        <navbar-component></navbar-component>
        <h1>Search Result</h1>
      `;

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

      loadingIndicator.addEventListener('click', () => {
        this.searchPagination(this.page);
      });
    } else {
      this.innerHTML = `
          <navbar-component></navbar-component>
          <h1>Search Result</h1>
        `;

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

customElements.define('search-result', SearchResult);
