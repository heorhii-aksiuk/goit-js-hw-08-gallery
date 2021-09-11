import galleryItems from './app.js';

const refs = {
  galleryListEl: document.querySelector('.js-gallery'),
};

const { galleryListEl } = refs;

const markup = galleryItems.map(item => {
  return ` <li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`;
});

galleryListEl.insertAdjacentHTML('afterbegin', markup.join(''));
