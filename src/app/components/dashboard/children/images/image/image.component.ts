import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  image: any = Image;
  token: string = '';
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params.token;
      this.imageService.getImage(this.token).then((image: any) => {
        this.image = image;
        this.imageService.setImage(image);
      });
    });
  }
}
