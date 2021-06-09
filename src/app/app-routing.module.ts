import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImagesComponent } from './components/dashboard/children/images/images.component';
import { ImageNewComponent } from './components/dashboard/children/images/image/image-new.component';
import { ImageComponent } from './components/dashboard/children/images/image/image.component';
import { watchDog } from './services/login-guardian.services';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [watchDog], children: [
    { path: 'images', component: ImagesComponent },
    { path: 'images/new', component: ImageNewComponent },
    { path: 'images/:token', component: ImageComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
