import axios from 'axios';

const API_KEY = '839e1f95d3ff4ebb9325eb7245b398c9';
const URL = 'https://newsapi.org/v2/everything';

export class NewsApi {
  constructor() {
    this.query = 'cat';
    this.page = 1;
    // this.pageSize = 15;
    this.totalPages = '';
    this.params = {
      params: {
        language: 'en',
        sortBy: 'popularity',
      },
    };
  }

  async fetchRender() {
    const url = `${URL}?q=${this.query}&page=${this.page}&apiKey=${API_KEY}`;

    const { data } = await axios.get(url);
    console.log(data);
    return data;
  }

  get perpage() {
    return this.pageSize;
  }

  set perpage(newPerpage) {
    this.pageSize = newPerpage;
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }

  incrementPage() {
    this.page += 1;
    console.log(this.page);
  }

  resetPage() {
    this.page = 1;
  }

  // calculateTotalPages(totalResults) {
  //   this.totalPages = Math.ceil(totalResults / this.pageSize);
  //   console.log(this.totalPages);
  // }

  get total() {
    return this.totalPages;
  }

  set total(newTotal) {
    this.totalPages = newTotal;
  }

  get isShowLoadMore() {
    return this.page < this.totalPages;
  }
}
