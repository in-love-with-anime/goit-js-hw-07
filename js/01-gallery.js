import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
let modalImage;


//  1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.

const galleryMarkup = galleryItems
    .map(({ original, preview, description }) => `
                    <li class="gallery__item">
                        <a class="gallery__link" href="${original}">
                            <img
                                class="gallery__image"
                                src="${preview}" 
                                data-source="${original}" 
                                alt= "${description}"
                            >
                        </a>
                    </li>`)
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
    document.addEventListener("keyup", onKeyPress);
};

//  Дополнительно. Добавление закрытия модального окна по нажатию клавиши `Escape`.

const onKeyPress = event => {
    event.code === "Escape"?.(modalImage.close());
    
    document.removeEventListener("keyup", onKeyPress);
};
