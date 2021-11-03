/* eslint-disable class-methods-use-this */
import '../component/NavbarComponent';
import fetchUserData from '../data/fetchUserData';

class Dashboard extends HTMLElement {
  // eslint-disable-next-line consistent-return
  async loadUserRecipes() {
    try {
      if (window.localStorage) {
        const userRecipeFromStorage = await JSON.parse(window.localStorage.getItem('savedRecipe'));
        if (userRecipeFromStorage && userRecipeFromStorage.length) {
          return userRecipeFromStorage;
        }
      }
    } catch (error) {
      return error;
    }
  }

  async loadUserData(userUrl) {
    return fetchUserData(userUrl)
      .then((result) => result[0])
      .catch((errorMessage) => errorMessage);
  }

  // eslint-disable-next-line class-methods-use-this
  disconnectedCallback() {
    //
  }

  connectedCallback() {
    this.classList.add('block');
    this.classList.add('mt-16');
    this.render();

    this.loadUserData('?seed=e7a63a5dc765414f&exc=login,gender,dob,registered')
      .then((data) => {
        console.log(data);
        this.data = data;
        this.render();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  render() {
    if (!this.data) {
      this.innerHTML = `
        <navbar-component></navbar-component>
        <h1>Skeleton Loader Displayed</h1>
      `;
    } else {
      const { name, location, picture } = this.data;

      this.innerHTML = `
        <navbar-component></navbar-component>
        <section id="user-hero" class="flex flex-col items-center w-full h-3/4 p-2 bg-yellow-100 text-green-800 shadow-sm">
          <img src="${picture.large}"  alt="user-avatar" class="rounded-lg w-24 h-24 mb-2"/>
          <h3>${name.first.concat(' ', name.last)}</h3>
          <p>${location.city}</p>
          <ul class="flex w-full justify-evenly mt-2 text-center">
            <li>
              <span>Resep Dibuat</span> 
              <h2>10</h2>
            </li>
            <li>
              <span>Resep Disimpan</span> 
              <h2>20</h2>
            </li> 
          </ul>
        </section>
        <h3 class="mx-2 tracking-wide">Resep Disimpan</h3> 
      `;
    }
  }
}

customElements.define('dashboard-element', Dashboard);
