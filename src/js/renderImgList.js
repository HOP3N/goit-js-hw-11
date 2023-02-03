export function renderImgList(images) {
  console.log(images, 'images');
  const markUp = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">
    <a href="${image.largeImageURL}"><img class="photo" 
    src="${image.webformatURL}" alt="${image.tags}" 
    title="${image.tags}" loading="lazy"/></a>
    
    <div class="info">
        <p class ="info__item"> Likes
        <span class="info__item-api"> ${image.likes} 
        </span>
        </p>
        <p class ="info__item"> Views
        <span class="info__item-api"> ${image.views} 
        </span>
        </p>
        <p class ="info__item"> Comments
        <span class="info__item-api"> ${image.comments} 
        </span>
        </p>
        <p class ="info__item"> Downloads
        <span class="info__item-api"> ${image.downloads} 
        </span>
        </p>
    </div>
    </div>`;
    })
    .join('');
    gallery.innerHTML += markUp;
}