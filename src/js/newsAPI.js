import axios from 'axios';

const API_KEY = '30576193-c13648781b6f89bf6b7ef27da';
const URL = 'https://pixabay.com/api';

export class NewsApi {
  constructor() {
    this.query = 'cat';
    this.page = 1;
    this.pageSize = 15;
    this.totalPages = '';
    // this.params = {
    //   params: {
    //     language: 'en',
    //     sortBy: 'popularity',
    //   },
    // };
  }

  async fetchRender() {
    // const url = `${URL}?q=${this.query}&page=${this.page}&apiKey=${API_KEY}`;

    const url = `${URL}/?key=${API_KEY}&q=${this.query}&page=${this.page}`;

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
  }

  resetPage() {
    this.page = 1;
  }

  // calculateTotalPages(totalHits) {
  //   this.totalPages = Math.ceil(totalHits / this.pageSize);

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
