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

  constructor(private imagesService: ImagesService, private router: Router) {}

  ngOnInit(): void {
    this.requestImages();
    this.closeModal();
  }

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
    this.imagesService.getImages(page).then(() => {
      this.setData();
    });
  }
}
