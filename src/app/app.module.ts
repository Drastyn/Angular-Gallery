import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//COMPONENTS
import { LoginComponent } from './components/auth/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImagesComponent } from './components/dashboard/children/images/images.component';
import { ImageNewComponent } from './components/dashboard/children/images/image/image-new.component';
import { ImageComponent } from './components/dashboard/children/images/image/image.component';
//SERVICES
import { LoginService } from './services/login.service';
import { ImageService } from './services/images.service';
//GUARDIANS
import { watchDog } from './services/login-guardian.services';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ImagesComponent,
    ImageNewComponent,
    ImageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [LoginService, ImageService, watchDog],
  bootstrap: [AppComponent],
})
export class AppModule {}
