import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroAppearencePipe } from './components/pipes/hero-appearence.pipe';
import { HeroDropdownPowerstatsComponent } from './components/hero/hero-dropdown-powerstats/hero-dropdown-powerstats.component';
import { OverallPipe } from './components/pipes/overall.pipe';
import { NgOptimizedImage } from '@angular/common';
import { HeroSearchComponent } from './components/hero/hero-search/hero-search.component';
import { FilterPipe } from './components/pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { TeamOverviewComponent } from './components/team/team-overview/team-overview.component';
import { BarWidthAllDirective } from './directives/bar-width-all.directive';
import { BarWidthDirective } from './directives/bar-width.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { HeroModalComponent } from './components/hero/hero-modal/hero-modal.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { NewHeroComponent } from './components/hero/new/new-hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HeroSearchCardsComponent } from './components/hero/hero-search-cards/hero-search-cards.component';
import { AlignmentPipe } from './pipes/alignment.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HeroAppearencePipe,
    HeroDropdownPowerstatsComponent,
    OverallPipe,
    AlignmentPipe,
    GenderPipe,
    HeroSearchComponent,
    FilterPipe,
    TeamOverviewComponent,
    BarWidthAllDirective,
    BarWidthDirective,
    HeroModalComponent,
    NewHeroComponent,
    HeroSearchCardsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
