import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchCardsComponent } from './hero-search-cards.component';

describe('HeroSearchCardsComponent', () => {
  let component: HeroSearchCardsComponent;
  let fixture: ComponentFixture<HeroSearchCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSearchCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSearchCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
