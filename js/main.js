import galleryItems from './app.js';

const refs = {
  galleryListEl: document.querySelector('.js-gallery'),
  modalEl: document.querySelector('.js-lightbox'),
  modalImageEl: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
};

const { galleryListEl, modalEl, modalImageEl, closeModalBtn } = refs;

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

galleryListEl.addEventListener('click', openFullImage);

function openFullImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  } else {
    openModal();
    createFullImage(event);
  }
}

/* Открытие модального окна по клику на элементе галереи. */

function openModal() {
  modalEl.classList.add('is-open');
}

/* Подмена значения атрибута src элемента img.lightbox__image. */

function createFullImage(event) {
  return (modalImageEl.src = event.target.dataset.source);
}

/* Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"] */

closeModalBtn.addEventListener('click', closeModal);

function closeModal() {
  modalEl.classList.remove('is-open');
  modalImageEl.src = '';
}

/* Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее. */
