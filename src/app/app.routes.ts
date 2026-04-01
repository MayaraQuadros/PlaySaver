import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'game-details-page/:id',
    loadComponent: () => import('./game-details-page/game-details-page.page').then( m => m.GameDetailsPagePage)
  },
  
];
