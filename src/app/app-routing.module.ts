import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/wiki/home/home.component';
import { DetailsComponent } from './components/wiki/details/details.component';

const routes: Routes = [
    { path:'home', component: HomeComponent },
    { path: 'home/:page', component: HomeComponent },
    { path:'pokemon/:id', component: DetailsComponent },
    { path:'', pathMatch:'full', redirectTo:'home' },
    { path:'**', pathMatch:'full', redirectTo:'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
