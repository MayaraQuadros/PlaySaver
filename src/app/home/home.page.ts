import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonIcon, IonButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, chevronBackOutline, chevronForwardOutline, heart, pricetagOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonIcon, IonSearchbar, IonButton, IonButtons, RouterLink, IonCol, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  @ViewChild(IonContent) content!: IonContent;
  games: any[] = [];
  searchWord: string = "";

  constructor(private gameService: GameService, private storage: Storage) {
    addIcons({ home, heart, chevronBackOutline, chevronForwardOutline, pricetagOutline })
  }

  ionViewWillEnter() {
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
        this.findFavourite();
      }
    )
  }

  findFavourite() {
    if (this.gameService.favouriteArray != null) {

      for (let i = 0; i < this.gameService.favouriteArray.length; i++) {
        for (let j = 0; j < this.games.length; j++) {
          if (this.gameService.favouriteArray[i].id == this.games[j].id) {
            this.games[j].isFav = true;
          }
        }
      }
    }
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
          this.findFavourite();
        }
      );
    }
  }

  favouriteClicked(event: Event, game: any) {
    if (game.isFav) {
      game.isFav = false;
      let index = this.gameService.favouriteArray.indexOf(game);
      this.gameService.favouriteArray.splice(index, 1);
    }
    else {
      game.isFav = true;
      if (this.gameService.favouriteArray.includes(game) == false) {
        console.log("inside false");
        this.gameService.favouriteArray.push(game);
        this.gameService.saveFavourite();
      }
      else {
        console.log("inside true");
      }
    }
    console.log(this.gameService.favouriteArray);
  }

  

  async IonViewDidEnter() {
    this.gameService.favouriteArray = await this.storage.get("favouriteGames");
    console.log(this.gameService.favouriteArray);
  }

 

  goFirstPage() {
    this.gameService.GetGameData(1).subscribe(
      (data) => {
        this.games = data.results;
        console.log(this.games);
        this.findFavourite();
      }
    )
  }

  getFavourite(){
    this.gameService.getFavourite;
  }

}


