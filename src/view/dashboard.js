/* eslint-disable class-methods-use-this */
import '../component/NavbarComponent';

class Dashboard extends HTMLElement {
  // eslint-disable-next-line consistent-return
  async loadUserRecipes() {
    try {
      console.log('fetching user recipes data...');
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

  // eslint-disable-next-line class-methods-use-this
  disconnectedCallback() {
    // this.data = undefined;
  }

  connectedCallback() {
    this.classList.add('block');
    this.classList.add('mt-16');
    this.render();

    this.loadUserRecipes()
      .then((data) => {
        // this.data = data;
        setTimeout(() => {
          this.render(data);
        }, 1500);
      });
  }

  render(data) {
    if (!data) {
      this.innerHTML = `
        <navbar-component></navbar-component>
        <h1>Dashboard Page</h1>
      `;
    } else {
      this.innerHTML = `
        <navbar-component></navbar-component>
        <h1>Show Data</h1>
      `;
    }
  }
}

customElements.define('dashboard-element', Dashboard);
