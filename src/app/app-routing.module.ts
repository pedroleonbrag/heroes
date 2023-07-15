import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroSearchComponent } from './components/hero/hero-search/hero-search.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authFnGuard } from './guards/auth.fn.guard';
import { NewHeroComponent } from './components/hero/new/new-hero.component';
import { HeroSearchCardsComponent } from './components/hero/hero-search-cards/hero-search-cards.component';

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
    path: 'search-cards',
    component: HeroSearchCardsComponent,
    canActivate: [authFnGuard],
    title: 'Search',
  },
  {
    path: 'new',
    component: NewHeroComponent,
    canActivate: [authFnGuard],
    title: 'New',
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
