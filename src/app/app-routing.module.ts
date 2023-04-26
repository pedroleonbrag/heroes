import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroSearchComponent } from './components/hero/hero-search/hero-search.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authFnGuard } from './guards/auth.fn.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authFnGuard],
    title: 'Home',
  },
  {
    path: 'search',
    component: HeroSearchComponent,
    canActivate: [authFnGuard],
    title: 'Search',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
