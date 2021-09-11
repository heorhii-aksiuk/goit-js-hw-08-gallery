import galleryItems from './app.js';

const refs = {
  galleryListEl: document.querySelector('.js-gallery'),
  modalEl: document.querySelector('.js-lightbox'),
  modalImageEl: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdropEl: document.querySelector('.lightbox__overlay'),
};

const { galleryListEl, modalEl, modalImageEl, closeModalBtn, backdropEl } =
  refs;

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

function openModal() {
  modalEl.classList.add('is-open');
}

function createFullImage(event) {
  modalImageEl.src = event.target.dataset.source;
}

closeModalBtn.addEventListener('click', closeModal);
backdropEl.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalwithEsc);

function closeModalwithEsc(event) {
  if (event.code === 'Escape') closeModal();
}

function closeModal() {
  modalEl.classList.remove('is-open');
  modalImageEl.src = '';
}

// if (modalEl.classList.contains('is-open')) {
//   galleryListEl.removeEventListener('click', openFullImage);
// }
// } else {
//   closeModalBtn.removeEventListener('click', closeModal);
//   backdropEl.removeEventListener('click', closeModal);
//   window.removeEventListener('keydown', closeModalwithEsc);
// }
