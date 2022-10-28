import { refs } from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NewsApi } from './js/newsAPI';
import { createMarkup } from './js/createMarkup';
import createPagination from './js/pagination';

// refs.form.addEventListener('submit', rednerNews);
// refs.btnLoadMore.addEventListener('click', loadMore);

const newsapi = new NewsApi();

// async function rednerNews(e) {
//   event.preventDefault();

//   newsapi.query = e.currentTarget.elements.searchQuery.value;

//   const searchQuery = newsapi.query;

//   if (!searchQuery) {
//     Notify.failure('Ввдедіть дані для пошуку!!!');
//     return;
//   }

//   clearPage();

//   try {
//     const { articles, totalResults } = await newsapi.fetchRender();

//     if (articles.length === 0) {
//       Notify.info(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }
//     const markup = createMarkup(articles);
//     refs.galleryReg.insertAdjacentHTML('beforeend', markup);

//     newsapi.calculateTotalPages(totalResults);

//     Notify.success(`Hooray! We found ${totalResults} news.`);

//     const pagination = new Pagination(refs.container, options);

//     if (newsapi.isShowLoadMore) {
//       refs.btnLoadMore.classList.remove('is-hidden');
//     }
//   } catch (error) {
//     Notify.failure(error.message);
//     clearPage();
//   }
// }

// async function loadMore() {
//   newsapi.incrementPage();

//   if (!newsapi.isShowLoadMore) {
//     refs.btnLoadMore.classList.add('is-hidden');
//     Notify.info('Were sorry, but youve reached the end of search results.');
//   }

//   try {
//     const { articles } = await newsapi.fetchRender();
//     const markup = createMarkup(articles);
//     refs.galleryReg.insertAdjacentHTML('beforeend', markup);
//   } catch (error) {
//     Notify.failure(error.message);
//     clearPage();
//   }
// }

window.addEventListener('load', rednerRage);
rednerNews();

async function rednerRage() {
  try {
    const pagination = createPagination();
    const { hits } = await newsapi.fetchRender();
    pagination.movePageTo(newsapi.page);
    pagination.on('afterMove', el => {
      console.log(el.page);

      const currentPage = el.page;
      newsapi.page = currentPage;
      rednerNews(currentPage);
      console.log(currentPage);
      console.log(newsapi.page);

      // if (newsapi.page > currentPage) {
      //   if (currentPage === 1) {
      //     newsapi.page = 1;
      //     rednerNews(currentPage);
      //     console.log(currentPage);
      //     console.log(newsapi.page);
      //     return;
      //   } else if (currentPage === 8) {
      //     newsapi.page = 8;
      //     rednerNews(currentPage);
      //     console.log(currentPage);
      //     console.log(newsapi.page);
      //     return;
      //   }
      //   newsapi.decrementPage();
      //   rednerNews(currentPage);
      //   console.log(currentPage);
      //   console.log(newsapi.page);
      // } else if (currentPage === 3) {
      //   newsapi.page = 3;
      //   rednerNews(currentPage);
      //   console.log(currentPage);
      //   console.log(newsapi.page);
      //   return;
      // } else if (currentPage === 10) {
      //   newsapi.page = 10;
      //   rednerNews(currentPage);
      //   console.log(currentPage);
      //   console.log(newsapi.page);
      //   return;
      // } else {
      //   newsapi.incrementPage();
      //   rednerNews(currentPage);
      //   console.log(currentPage);
      //   console.log(newsapi.page);
      // }
    });

    // newsapi.calculateTotalPages(totalResults);
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function rednerNews() {
  clearPage();
  try {
    const { hits } = await newsapi.fetchRender();
    const markup = createMarkup(hits);
    refs.galleryReg.insertAdjacentHTML('beforeend', markup);
    // newsapi.calculateTotalPages(totalResults);
  } catch (error) {
    Notify.failure(error.message);
    clearPage();
  }
}

function clearPage() {
  refs.galleryReg.innerHTML = '';
}
