class EditorComponent extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex');
    this.classList.add('flex-col');
    this.classList.add('flex-1');
    this.classList.add('my-1');
    this.classList.add('py-1');

    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="editor" class="flex flex-col flex-1 overflow-auto"></div>
    `;
  }
}

customElements.define('editor-element', EditorComponent);
