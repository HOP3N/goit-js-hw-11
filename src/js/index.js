import { imageGallery } from '../js/imageGallery';
import * as renderImgList from './renderImgList';
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
  fetchImageGallery(onTrimValue, pageNumber).then(onFoundData => {
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

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
