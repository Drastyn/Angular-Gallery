import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//COMPONENTS
import { LoginComponent } from './components/auth/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImagesComponent } from './components/dashboard/children/images/images.component';
import { ImageNewComponent } from './components/dashboard/children/images/image/image-new.component';
import { ImageComponent } from './components/dashboard/children/images/image/image.component';
import { CreditsComponent } from './components/dashboard/templates/credits.component';
import { FooterComponent } from './components/dashboard/templates/footer.component';
//SERVICES
import { LoginService } from './services/login.service';
import { ImagesService } from './services/images.service';
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
    CreditsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [LoginService, ImagesService, watchDog],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }
}
