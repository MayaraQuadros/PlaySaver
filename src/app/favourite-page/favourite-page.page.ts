import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, } from '@angular/router';
import { IonText, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonIcon, IonButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { addIcons } from 'ionicons';
import { home, chevronBackOutline, chevronForwardOutline, heart, pricetagOutline } from 'ionicons/icons';







@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.page.html',
  styleUrls: ['./favourite-page.page.scss'],
  standalone: true,
  imports: [ IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonIcon, RouterLink, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritePagePage implements OnInit {

  constructor(public gameService: GameService) {
    addIcons({ home, heart, chevronBackOutline, chevronForwardOutline, pricetagOutline })


  }

  ngOnInit() {

  }
  async ionViewWillEnter() {
    await this.gameService.getFavourites();

  }

  getFavourite() {
    console.log(this.gameService.favouriteArray);
  }

  


}
