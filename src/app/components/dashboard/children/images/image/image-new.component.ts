import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image-new.component.html',
})
export class ImageNewComponent implements OnInit {
  urlPreview: string = '';
  name: string = '';
  file: any;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  onImageChange(event: any) {
    this.file =
      event.target.files[0] && event.target.files[0].type.includes('image/')
        ? event.target.files[0]
        : '';
    if (this.file) {
      const reader = new FileReader();
      const [fileAux] = event.target.files;
      reader.readAsDataURL(fileAux);
      reader.onload = () => {
        this.urlPreview = reader.result as string;
      };
    } else {
      this.urlPreview = '';
    }
  }

  newImage() {
    let image = new FormData();
    image.append('archive[name]', this.name);
    image.append('archive[image]', this.file);
    this.imageService.postImage(image);
  }
}
