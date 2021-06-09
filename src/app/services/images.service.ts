import axios from 'axios';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ImageService {
  authToken: string = JSON.stringify(sessionStorage.getItem('token'));
  images: Image[] = [];
  image: any = Image;
  petition = axios.create({
    baseURL: environment.apiUrl,
  });

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: this.authToken,
  };

  setImages(images: Image[]) {
    this.images = images;
  }

  setImage(image: Image) {
    this.image = image;
  }

  constructor(private router: Router) {}

  getImages(page: number = 0) {
    return this.petition
      .get(`images?page=${page}`, {
        headers: this.headers,
      })
      .then((response) => (response.data))
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
