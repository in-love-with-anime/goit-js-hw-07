import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
const bodyEl = document.querySelector('body');
let modalImage;


//  1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.

const galleryMarkup = galleryItems
    .map(({ original, preview, description }) => `
                <div class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img
                            class="gallery__image"
                            src="${preview}" 
                            data-source="${original}" 
                            alt= "${description}"
                        >
                    </a>
                </div>`)
    .join("");

galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

// 2. Реализация делегирования на `div.gallery` и получение `url` большого изображения.

const onGalleryClick = event => {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") return;

    onOpenModal(event.target.dataset.source);
};

galleryEl.addEventListener('click', onGalleryClick);

// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. 

const onCreateModal = img => basicLightbox.create(`<img src="${img}" width="1280" alt="${img}">`);

// 4. Открытие модального окна по клику на элементе галереи.

const onOpenModal = img => {
    modalImage = onCreateModal(img);
    modalImage.show();
    console.log("Open modal");
    document.addEventListener("keyup", onKeyPress);
};

// const onCloseModal = event => {
//     if (event === "click") modalImage.close();
//     console.log("Close modal with click");
//     document.removeEventListener("click", onKeyPress);
// };

//  Дополнительно. Добавление закрытия модального окна по нажатию клавиши `Escape`.

const onKeyPress = event => {
    if (event.code === "Escape") modalImage.close();
    console.log("Close modal with escape");
    document.removeEventListener("keyup", onKeyPress);
};



