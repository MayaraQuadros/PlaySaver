import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonIcon, IonButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { desktopOutline ,logoXbox, logoPlaystation, home, chevronBackOutline, chevronForwardOutline, heart, pricetagOutline } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItem, CommonModule, IonIcon, IonSearchbar, IonButton, IonButtons, RouterLink, IonCol, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent, IonItem],
})
export class HomePage {
  @ViewChild(IonContent) content!: IonContent;
  games: any[] = [];
  searchWord: string = "";

  constructor(private gameService: GameService) {
    addIcons({ desktopOutline ,logoXbox,logoPlaystation, home, heart, chevronBackOutline, chevronForwardOutline, pricetagOutline })
  }

  async ionViewWillEnter() {
    await this.gameService.getFavourites();
    if (this.searchWord == "")
      this.loadGames();
    else
      this.searchGames(this.searchWord);

  }

  loadGames() {
    this.gameService.GetGameData(this.gameService.page).subscribe(
      (data) => {
        this.games = data.results;
        console.log(this.games);
        this.findFavouritePlatform();
      }
    )
  }
  

  findFavouritePlatform() {
    if (this.gameService.favouriteArray != null) {

      for (let i = 0; i < this.games.length; i++) {
        for (let j = 0; j < this.gameService.favouriteArray.length; j++) {
          if (this.gameService.favouriteArray[j].id == this.games[i].id) {
            this.games[i].isFav = true;
          }
          if(this.games[i].parent_platforms?.some((plat: any) => plat.platform.id === 1))
          {
            this.games[i].pc = true;
          }
          if(this.games[i].parent_platforms?.some((plat: any) => plat.platform.id === 2))
          {
            this.games[i].playStation = true;
          }
          if(this.games[i].parent_platforms?.some((plat: any) => plat.platform.id === 3))
          {
            this.games[i].xbox = true;
          }
            

        }
      }
    }
  }

  checkPlatform(id: number){
    let plat
  }

  onPrevButton() {
    this.gameService.prevPage();
    this.loadGames();
    this.content.scrollToTop(500);


  }

  onNextButton() {
    this.gameService.nextPage();
    this.loadGames();
    this.content.scrollToTop(1000);
  }

  searchGames(event: any) {
    let word = event.detail.value;
    this.searchWord = word;
    if (this.searchWord != " ") {
      this.gameService.GetGameData(this.searchWord).subscribe(
        (gameData) => {
          this.games = gameData.results;
          this.findFavouritePlatform();
        }
      );
    }
  }

  favouriteClicked(event: Event, game: any) {
    if (this.gameService.favouriteArray != null) {
      let index = -1;

      for (let i = 0; i < this.gameService.favouriteArray.length; i++) {
        if (this.gameService.favouriteArray[i].id == game.id) {
          index = i;
          break;
        }
      }
      if (game.isFav) {
        console.log(this.gameService.favouriteArray);
        game.isFav = false;

        this.gameService.favouriteArray.splice(index, 1);
        this.gameService.saveFavourite();
        console.log("inside true");

        console.log(game);
      }
      else {
        game.isFav = true;
        if (index == -1) {
          console.log("inside false");
          this.gameService.favouriteArray.push(game);
          this.gameService.saveFavourite();
        }
      }
    }
    else {
      this.gameService.favouriteArray = [];
      this.gameService.favouriteArray.push(game);
      this.gameService.saveFavourite();
    }
  }

  goFirstPage() {
    this.gameService.GetGameData(1).subscribe(
      (data) => {
        this.games = data.results;
        console.log(this.games);
        this.findFavouritePlatform();
      }
    )
  }

}


