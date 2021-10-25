/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
import Swiper, { Pagination } from 'swiper';

class SliderComponent extends HTMLElement {
  initSwiper() {
    Swiper.use([Pagination]);

    const swiper = new Swiper('.swiper', {
      spaceBetween: 32,
    });
  }

  set sliderData(data) {
    this._data = data;

    this.render();
    this.initSwiper();
  }

  connectedCallback() {
    this.classList.add('w-full');
    this.classList.add('h-auto');

    this.render();
    this.initSwiper();
  }

  render() {
    this.innerHTML = '';

    if (this._data) {
      this.innerHTML = `
      <div class="swiper w-full h-auto pt-2 pb-4 text-gray-800 text-sm overflow-hidden">
        <div class="swiper-wrapper flex flex-grow flex-shrink-0 w-full h-full">
          ${this._data.map((step) => `<div class="swiper-slide flex-shrink-0 w-full h-full p-2 bg-green-200 rounded-md shadow-lg">${step.slice(1)}</div>`).join('')}
        </div>
      </div>
    `;
    } else {
      this.innerHTML = `
      <div class="swiper w-full h-auto pt-2 pb-4 text-gray-800 text-sm overflow-hidden">
        <div class="swiper-wrapper flex flex-grow flex-shrink-0 w-full h-full">
          <div class="swiper-slide flex-shrink-0 w-full h-full p-2 bg-green-200 rounded-md shadow-lg">Slide 1</div>
          <div class="swiper-slide flex-shrink-0 w-full h-full p-2 bg-green-200 rounded-md shadow-lg">Slide 2</div>
          <div class="swiper-slide flex-shrink-0 w-full h-full p-2 bg-green-200 rounded-md shadow-lg">Slide 3</div>
        </div>
      </div>
      `;
    }
  }
}

customElements.define('step-slider', SliderComponent);
