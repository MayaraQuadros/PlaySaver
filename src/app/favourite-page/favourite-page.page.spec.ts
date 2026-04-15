import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritePagePage } from './favourite-page.page';

describe('FavouritePagePage', () => {
  let component: FavouritePagePage;
  let fixture: ComponentFixture<FavouritePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
