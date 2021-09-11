import galleryItems from './app.js';

const refs = {
  galleryListEl: document.querySelector('.js-gallery'),
};

const { galleryListEl } = refs;

/* Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.*/

galleryListEl.insertAdjacentHTML('afterbegin', createMarkup(galleryItems));

function createMarkup(data) {
  return data
    .map(item => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"/>
        </a>
      </li>`;
    })
    .join('');
}

/* Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. */

galleryListEl.addEventListener('click', eventCallback); // изменить имя коллбека

function eventCallback(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  } else {
    return console.dir(event.target.dataset.source);
  }
}
