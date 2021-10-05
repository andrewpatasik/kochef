import '../component/NavbarComponent';

class Home extends HTMLElement {
  connectedCallback() {
    console.log('home rendered.');
    this.classList.add('block');
    this.classList.add('mt-16');

    this.render();
  }

  render() {
    this.innerHTML = `
      <navbar-component></navbar-component>
      <h1>Home Page</h1>
    `;
  }
}

customElements.define('home-element', Home);
