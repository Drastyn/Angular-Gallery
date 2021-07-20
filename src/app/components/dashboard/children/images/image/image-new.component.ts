import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image-new.component.html',
})
export class ImageNewComponent implements OnInit {
  urlPreview: string = '';
  checkErrors: any = null;
  name: string = '';
  file: any;

  constructor(private imagesService: ImagesService) {
    this.removeAlert();
  }

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

  formValidations(name: string, file: any) {
    let errors = [];
    if (!file) {
      errors.push('Remember select your image');
    }
    if (name.length < 4 || name.length > 30) {
      errors.push('Name must be have between 4 to 30 characters');
    } else if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(name)) {
      errors.push('Name not be have especial characters');
    }
    if (errors.length > 0) {
      this.checkErrors = errors[errors.length - 1];
    }
  }

  removeAlert() {
    setInterval(() => {
      if (this.checkErrors) {
        this.checkErrors = null;
      }
    }, 4000);
  }

  newImage() {
    let image = new FormData();
    this.formValidations(this.name, this.file);
    if (!this.checkErrors) {
      image.append('archive[name]', this.name);
      image.append('archive[image]', this.file);
      this.imagesService.postImage(image);
    }
  }
}
