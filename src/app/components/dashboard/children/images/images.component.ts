import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit {
  images: Image[] = [];
  modalIsOpen: boolean = false;
  @ViewChild('modal') modal: any;
  @ViewChild('modalBackground') modalBackground: any;
  @ViewChild('modalImage') modalImage: any;
  nextPage: number = 0;
  prevPage: number = 0;

  constructor(private imageService: ImageService, private router: Router) {}

  ngOnInit(): void {
    this.imageService.getImages().then((imagesFound: any) => {
      this.setData(imagesFound);
    });
    this.closeModal();
  }

  setData(imagesFound: any) {
    this.images = imagesFound.data;
    this.nextPage = imagesFound.next_page_url;
    this.prevPage = imagesFound.prev_page_url;
    this.imageService.setImages(this.images);
  }

  openModal(imageUrl: string) {
    this.modalIsOpen = true;
    this.modal.nativeElement.style.display = 'block';
    this.modalImage.nativeElement.src = imageUrl;
  }

  closeModal() {
    window.addEventListener('click', (event) => {
      if (
        this.modalIsOpen &&
        event.target === this.modalBackground.nativeElement
      ) {
        this.modalIsOpen = false;
        this.modalImage.nativeElement.src = '';
        this.modal.nativeElement.style.display = 'none';
      }
    });
  }

  goToPage(page: number) {
    this.imageService.getImages(page).then((imagesFound: any) => {
      this.setData(imagesFound);
    });
  }
}
