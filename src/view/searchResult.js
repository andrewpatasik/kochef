/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import '../component/NavbarComponent';
import '../component/RecipeCardComponent';
import '../component/LoadingIndicatorComponent';
import fetchRecipes from '../data/fetchRecipes';
import searchResult from '../data/searchResultData';
// import fakeSearchResultData from '../data/fakeSearchResultData.json';

class SearchResult extends HTMLElement {
  constructor() {
    super();

    this.page = 1;
    this.startIndex = 0;
    this.endOfPage = false;
    this.searchResultsData = [];
  }

  searchPagination(page) {
    const limit = 10;
    const accumulator = [];

    const endIndex = page * limit;
    const nextIndex = endIndex + 1;

    let currentIndex = this.startIndex;
    const dataLen = this.searchResultsData.length;

    if (this.endOfPage) {
      return accumulator;
    }

    for (currentIndex; currentIndex <= endIndex; currentIndex += 1) {
      accumulator.push(this.searchResultsData[currentIndex]);
      if (currentIndex === dataLen) {
        this.endOfPage = true;

        accumulator.pop();
        return accumulator;
      }
    }

    this.startIndex = nextIndex;
    this.page += 1;

    return accumulator;
  }

  initObserver() {
    const target = this.lastChild;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const recipeData = this.searchPagination(this.page);

          if (recipeData.length > 0) {
            console.log(recipeData);
            let newRecipeData = searchResult.getData();
            newRecipeData = newRecipeData.concat(recipeData);
            searchResult.setState(newRecipeData)
              .then((data) => {
                this.data = data;
                this.render();
                this.initObserver();
              });
          } else {
            observer.unobserve(target);
            this.removeChild(this.lastChild);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(target);
  }

  disconnectedCallback() {
    this.startIndex = 0;
    this.page = 1;
    this.endOfPage = false;
    this.searchResultsData = [];
    this.data = null;
  }

  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('w-full');
    this.classList.add('mt-16');

    this.render();

    // get urlParam
    const queryString = window.location.search;
    const queryParam = new URLSearchParams(queryString);
    const param = queryParam.get('q');

    // initial fetched
    // this.searchResultsData = [...fakeSearchResultData];
    fetchRecipes(`/api/search/?q=${param}`)
      .then((results) => {
        this.searchResultsData = [...results];
        console.log(this.searchResultsData);
        const recipeData = this.searchPagination(this.page);
        searchResult.setState(recipeData)
          .then((data) => {
            this.data = data;
            this.render();
          }).then(() => {
            this.initObserver();
          });
      });
  }

  render() {
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
