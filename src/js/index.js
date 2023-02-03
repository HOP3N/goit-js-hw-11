import { imageGallery } from '../js/imageGallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btnLoadMore.style.display = 'none';

let pageNumber = 1;

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const onTrimValue = input.value.trim();
  if (onTrimValue !== '') {
    imageGallery(onTrimValue, pageNumber).then(onFoundData => {
      if (onFoundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImgList(onFoundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${onFoundData.totalHits} images.`
        );

        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

btnLoadMore.addEventListener('click', () => {
  pageNumber++;
  const onTrimValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  imageGallery(onTrimValue, pageNumber).then(onFoundData => {
    if (onFoundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImgList(onFoundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${onFoundData.totalHits} images.`
      );

      btnLoadMore.style.display = 'block';
    }
  });
});

function renderImgList(images) {
  console.log(images, 'images');
  const markUp = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">
    <a href="${image.largeImageURL}"><img class="photo" 
    src="${image.webformatURL}" alt="${image.tags}" 
    title="${image.tags}" loading="lazy"/></a>
    
    <div class="info">
        <p class ="info-item"> Likes
        <span class="info-item-api"> ${image.likes} 
        </span>
        </p>
        <p class ="info-item"> Views
        <span class="info-item-api"> ${image.views} 
        </span>
        </p>
        <p class ="info-item"> Comments
        <span class="info__item-api"> ${image.comments} 
        </span>
        </p>
        <p class ="info-item"> Downloads
        <span class="info-item-api"> ${image.downloads} 
        </span>
        </p>
    </div>
    </div>`;
    })
    .join('');
    gallery.innerHTML += markUp;
}

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
