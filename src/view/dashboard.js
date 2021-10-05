import '../component/NavbarComponent';

class Dashboard extends HTMLElement {
  connectedCallback() {
    console.log('dashboard rendered.');
    this.classList.add('block');
    this.classList.add('mt-16');

    this.render();
  }

  render() {
    this.innerHTML = `
      <navbar-component></navbar-component>
      <h1>Dashboard Page</h1>
    `;
  }
}

customElements.define('dashboard-element', Dashboard);
