import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery'); 


// 1. Создание и рендер разметки по массиву данных galleryItems

const galleryMarkup = galleryItems
    .map(({ original, preview, description }) => `
                <a class="gallery__item" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        alt="${description}"
                    />
                </a>
                `)
    .join("");

galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

console.log(galleryEl);


//  3. Инициализация библиотеки после того, как элементы галереи созданы и добавлены в `div.gallery`.

const lightboxOptions = {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
};

const lightboxGallery = new SimpleLightbox(".gallery a", lightboxOptions);