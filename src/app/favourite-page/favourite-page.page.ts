import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem } from '@ionic/angular/standalone';
import { RouterLink, } from '@angular/router';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonIcon, IonButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { addIcons } from 'ionicons';
import { desktopOutline ,logoXbox, logoPlaystation, home, chevronBackOutline, chevronForwardOutline, heart, pricetagOutline } from 'ionicons/icons';






@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.page.html',
  styleUrls: ['./favourite-page.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonIcon, RouterLink, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem]
})
export class FavouritePagePage implements OnInit {

  constructor(public gameService: GameService) {
    addIcons({ desktopOutline ,logoXbox, logoPlaystation, home, heart, chevronBackOutline, chevronForwardOutline, pricetagOutline })
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.gameService.getFavourites();
  }

  favouriteClicked(event: Event, game: any) {
    let index = -1;
    game.isFav = false;
    for (let i = 0; i < this.gameService.favouriteArray.length; i++) {
      if (this.gameService.favouriteArray[i].id == game.id)
        index = i;
    }
    this.gameService.favouriteArray.splice(index, 1);
    this.gameService.saveFavourite();

  }

  findPlatform() {
    if (this.gameService.favouriteArray != null) {

      for (let i = 0; i < this.gameService.favouriteArray.length; i++) {

        if (this.gameService.favouriteArray[i].parent_platforms?.some((plat: any) => plat.platform.id === 1)) {
          this.gameService.favouriteArray[i].pc = true;
        }
        if (this.gameService.favouriteArray[i].parent_platforms?.some((plat: any) => plat.platform.id === 2)) {
          this.gameService.favouriteArray[i].playStation = true;
        }
        if (this.gameService.favouriteArray[i].parent_platforms?.some((plat: any) => plat.platform.id === 3)) {
          this.gameService.favouriteArray[i].xbox = true;
        }
      }
    }
  }
}
