import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDetailsPagePage } from './game-details-page.page';

describe('GameDetailsPagePage', () => {
  let component: GameDetailsPagePage;
  let fixture: ComponentFixture<GameDetailsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
