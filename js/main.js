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

let openImage;

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
  if (event.target.nodeName !== 'IMG') return;
  openModal();
  createFullImage(event);
}

function openModal() {
  window.addEventListener('keydown', closeModalWithEsc);
  window.addEventListener('keydown', leafingThrough);
  modalEl.classList.add('is-open');
}

function createFullImage(event) {
  modalImageEl.src = event.target.dataset.source;
  openImage = event.target.dataset.source;
}

closeModalBtn.addEventListener('click', closeModal);
backdropEl.addEventListener('click', closeModal);

function closeModal() {
  window.removeEventListener('keydown', closeModalWithEsc);
  window.removeEventListener('keydown', leafingThrough);
  modalEl.classList.remove('is-open');
  modalImageEl.src = '';
}

function closeModalWithEsc(event) {
  if (event.code === 'Escape') closeModal();
}

function leafingThrough(event) {
  if (event.code === 'ArrowRight') nextImage(galleryItems);
  if (event.code === 'ArrowLeft') previousImage(galleryItems);
}

function nextImage(data) {
  let imageArray = data.map(item => item.original);
  let currentImageIndex = imageArray.indexOf(openImage);

  if (currentImageIndex === imageArray.length - 1) return;

  let nextImageIndex = currentImageIndex + 1;
  modalImageEl.src = imageArray[nextImageIndex];
  openImage = imageArray[nextImageIndex];
}

function previousImage(data) {
  let imageArray = data.map(item => item.original);
  let currentImageIndex = imageArray.indexOf(openImage);

  if (currentImageIndex === 0) return;

  let previousImageIndex = currentImageIndex - 1;
  modalImageEl.src = imageArray[previousImageIndex];
  openImage = imageArray[previousImageIndex];
}
