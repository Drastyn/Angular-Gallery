import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit {
  images: Image[] = [];
  searchInput: any;
  isSearch: boolean = false;
  modalIsOpen: boolean = false;
  @ViewChild('modal') modal: any;
  @ViewChild('modalBackground') modalBackground: any;
  @ViewChild('modalImage') modalImage: any;
  nextPage: number = 0;
  prevPage: number = 0;

  constructor(private imagesService: ImagesService, private router: Router) {
    this.requestImages();
    this.closeModal();
  }

  ngOnInit(): void {}

  requestImages() {
    this.imagesService.getImages().then(() => this.setData());
  }

  makeSearch() {
    if (this.searchInput) {
      this.imagesService.searchImages(this.searchInput).then(() => {
        this.setData();
        this.isSearch = true;
      });
    }
  }

  refresh() {
    this.requestImages();
    this.searchInput = null;
    this.isSearch = false;
  }

  setData() {
    this.images = this.imagesService.getThisImages();
    this.nextPage = this.imagesService.getNextPage();
    this.prevPage = this.imagesService.getPrevPage();
  }

  openModal(imageUrl: string) {
    this.modalIsOpen = true;
    this.enableModalStyles(imageUrl);
  }

  enableModalStyles(imageUrl: string) {
    this.modalImage.nativeElement.classList.remove('is-hidden');
    this.modalImage.nativeElement.src = imageUrl;
    this.modal.nativeElement.classList.add('modal');
    this.modalBackground.nativeElement.classList.add('modal-background');
  }

  closeModal() {
    window.addEventListener('click', (event) => {
      if (
        this.modalIsOpen &&
        event.target === this.modalBackground.nativeElement
      ) {
        this.modalIsOpen = false;
        this.disableModalStyles();
      }
    });
  }

  disableModalStyles() {
    this.modalImage.nativeElement.src = '';
    this.modalImage.nativeElement.classList.add('is-hidden');
    this.modal.nativeElement.classList.remove('modal');
    this.modalBackground.nativeElement.classList.remove('modal-background');
  }

  goToPage(page: number) {
    this.imagesService.getImages(page).then(() => {
      this.setData();
    });
  }
}
