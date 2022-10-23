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

async function rednerRage() {
  try {
    const { articles } = await newsapi.fetchRender();

    const pagination = createPagination();

    pagination.movePageTo(articles.page);
    pagination.on('afterMove', event => {
      console.log(event.page);
      const currentPage = event.page;
      console.log(currentPage);
      rednerNews(currentPage);
    });

    // newsapi.calculateTotalPages(totalResults);
  } catch (error) {
    Notify.failure(error.message);
    clearPage();
  }
}

async function rednerNews(currentPage) {
  try {
    const { articles } = await newsapi.fetchRender(currentPage);

    const markup = createMarkup(articles);
    refs.galleryReg.insertAdjacentHTML('beforeend', markup);
    // newsapi.calculateTotalPages(totalResults);
  } catch (error) {
    Notify.failure(error.message);
    clearPage();
  }
}

function clearPage() {
  newsapi.resetPage();
  refs.galleryReg.innerHTML = '';
  refs.btnLoadMore.classList.add('is-hidden');
}
