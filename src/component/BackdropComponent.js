class BackdropComponent extends HTMLElement {
  connectedCallback() {
    this.classList.add('block');
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="fixed w-full h-screen bg-gray-400"></div> 
    `;
  }
}

customElements.define('backdrop-component', BackdropComponent);
