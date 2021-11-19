import '../component/NavbarComponent';

class Create extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('pt-16');
    this.classList.add('min-h-screen');
    this.render();
  }

  render() {
    this.innerHTML = `
      <navbar-component></navbar-component>
      <h1>Create Page</h1>
    `;
  }
}

customElements.define('create-element', Create);
