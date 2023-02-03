export const imageGallery = async (inputValue, pageNum) => {
  return await fetch(
    `https://pixabay.com/api/?key=33348529-cc31cea9ad94d2befe505f822&q=${inputValue}&image_type=photo&orientation-horizontal&safesearch=true&per_page=40&page=${pageNum}`
  )
  .then(async response => {
    if(!response.ok) {
        if (response.status === 404) {
            return [];
        }
        throw new Error(response.status);
    }
    return await response.json();
  })
  .catch(error => {
    console.error(error);
  });
};
