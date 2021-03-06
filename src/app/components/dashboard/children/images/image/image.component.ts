import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  image: any = Image;
  token: string = '';
  constructor(
    private route: ActivatedRoute,
    private imagesService: ImagesService
  ) {
    this.getImage();
  }

  ngOnInit(): void {}

  getImage() {
    this.route.params.subscribe((params) => {
      this.token = params.token;
      this.imagesService.getImage(this.token).then((image: any) => {
        this.image = image;
      });
    });
  }
}
