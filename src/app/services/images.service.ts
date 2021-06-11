import axios from 'axios';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ImagesService {
  authToken: string = JSON.stringify(sessionStorage.getItem('token'));
  images: Image[] = [];
  nextPage: number = 0;
  prevPage: number = 0;
  petition = axios.create({
    baseURL: environment.apiUrl,
  });

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.authToken,
  };

  getThisImages() {
    return this.images;
  }

  getNextPage() {
    return this.nextPage;
  }

  getPrevPage() {
    return this.prevPage;
  }

  constructor(private router: Router) {}

  getImages(page: number = 1) {
    return this.petition
      .get(`images?page=${page}`, {
        headers: this.headers,
      })
      .then((response) => {
        this.images = response.data.images;
        this.nextPage = response.data.next_page_url;
        this.prevPage = response.data.prev_page_url;
      })
      .catch((error) => console.log(error));
  }

  searchImages(search: string, page: number = 1) {
    return this.petition({
      method: 'post',
      url: `images?page=${page}`,
      headers: this.headers,
      data: {
        search: search,
      },
    })
      .then((response) => {
        this.images = response.data.images;
        this.nextPage = response.data.next_page_url;
        this.prevPage = response.data.prev_page_url;
      })
      .catch((error) => console.log(error));
  }

  getImage(token: string) {
    return this.petition
      .get(`images/${token}`, {
        headers: this.headers,
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  postImage(image: any) {
    return this.petition
      .post(`upload`, image, {
        headers: this.headers,
      })
      .then((response) => {
        this.router.navigate([`images/${response.data.token}`]);
      })
      .catch((error) => console.log(error));
  }
}
