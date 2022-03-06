import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);


const galleryEl = document.querySelector('.gallery');
const cardsMarkup = createImgCardsMakup(galleryItems);
galleryEl.innerHTML = cardsMarkup;


function createImgCardsMakup(galleryImages) {
    return galleryImages.map(({ preview, original, description }) => {
        return `<a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" 
            alt="${description}" />
            </a>`;
    }).join('');
};

galleryEl.addEventListener('click', onGalleryImageClick);

function onGalleryImageClick(event) {
    event.preventDefault();

};

var lightbox = new SimpleLightbox('.gallery a', {'captionsData': 'alt','captionDelay': 250 });
