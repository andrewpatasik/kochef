// import fetchRecipes from '../data/fetchRecipes';
import recipeData from '../data/RecipeData';
import fakeData from '../data/fakeData.json';
import '../component/NavbarComponent';
import '../component/SearchComponent';
import '../component/SelectedRecipeComponent';
import '../component/TodayRecipeComponent';
import '../component/AllRecipeComponent';
import '../component/CategoryComponent';
import '../component/LoadingIndicatorComponent';

class Home extends HTMLElement {
  constructor() {
    super();

    this.currentPage = 1;

    window.addEventListener = window.addEventListener.bind(window);
    this.populateNextPage = this.populateNextPage.bind(this);

    if (window.localStorage) {
      if (!localStorage.getItem('userRecipeData')) {
        localStorage.setItem('userRecipeData', JSON.stringify({
          today: {},
          selected: [],
        }));
      }
    }
  }

  populateNextPage() {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = document.documentElement;

    if ((scrollTop + clientHeight) >= scrollHeight - 1) {
      window.removeEventListener('scroll', this.populateNextPage, {
        passive: true,
      });

      this.currentPage += 1;
      console.log(this.currentPage);

      // fetched data
      // fetchRecipes(`/api/recipes/:${this.currentPage}`)
      //   .then((results) => {
      //     let concatData = recipeData.getData().allRecipeDataState;
      //     concatData = concatData.concat(results);
      //     recipeData.setState('all', concatData)
      //       .then(() => {
      //         document.querySelector('all-recipe')
      //           .recipeCardData = recipeData.getData()
      //             .allRecipeDataState;

      //         window.addEventListener('scroll', this.populateNextPage, {
      //           passive: true,
      //         });
      //       });
      //   });

      // fake data
      setTimeout(() => {
        let fakeNewData = recipeData.getData().allRecipeDataState;

        fakeNewData = fakeNewData.concat(fakeData);
        recipeData.setState('all', fakeNewData)
          .then((results) => {
            console.log(results);
            document.querySelector('all-recipe')
              .recipeCardData = recipeData.getData()
                .allRecipeDataState;

            window.addEventListener('scroll', this.populateNextPage, {
              passive: true,
            });
          });
      }, 1500);
    }
  }

  disconnectedCallback() {
    this.currentPage = 1;

    window.removeEventListener('scroll', this.populateNextPage, {
      passive: true,
    });
  }

  connectedCallback() {
    window.scrollTo(0, 0);

    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('mt-16');

    this.render();

    // fetchRecipes('/api/recipes/:1')
    //   .then((results) => {
    //     recipeData.setState('all', results)
    //       .then(() => {
    //         document.querySelector('category-component')
    //           .categoryData = fakeCategory;

    //         document.querySelector('all-recipe')
    //           .recipeCardData = recipeData.getData()
    //             .allRecipeDataState;
    //       })
    //       .then(() => {
    //         window.addEventListener('scroll', this.populateNextPage, {
    //           passive: true,
    //         });
    //       });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    recipeData.setState('all', fakeData)
      .then(() => {
        setTimeout(() => {
          this.querySelector('all-recipe')
            .recipeCardData = recipeData.getData()
              .allRecipeDataState;
        }, 1500);
      })
      .then(() => {
        setTimeout(() => {
          window.addEventListener('scroll', this.populateNextPage, {
            passive: true,
          });
        }, 3000);
      });
  }

  render() {
    this.innerHTML = '';

    this.innerHTML = `
      <navbar-component home="${true}"></navbar-component>
      <div class="w-full h-20 flex items-center justify-center">
        <searchbar-component home="${true}" class="w-4/6"></searchbar-component>
      </div>
      <div id="heading-component" class="w-full px-2 my-4">
        <h1 class="w-auto leading-none tracking-wide">Resep Hari Ini</h1>          
      </div>
      <today-recipe></today-recipe>
      <h3 class="mx-2 w-1/2 leading-none tracking-wide">Kategori Pilihan</h3>
      <category-component></category-component>
      <h3 class="mx-2 w-1/2 leading-none tracking-wide">Masakan Spesial Hari Raya</h3>
      <selected-recipe></selected-recipe>
      <h3 class="mx-2 tracking-wide">Semua Resep</h3>
      <all-recipe></all-recipe>
      <loading-indicator></loading-indicator>
    `;
  }
}

customElements.define('home-element', Home);
