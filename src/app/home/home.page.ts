import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonIcon, IonButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, chevronBackOutline, chevronForwardOutline, heart, pricetagOutline, pricetag } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { find } from 'rxjs';







@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonIcon, IonSearchbar, IonButton, IonButtons, RouterLink, IonCol, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  @ViewChild(IonContent) content!: IonContent;
  games: any[] = [];
  dealsArray: number[] = [];
  searchWord: string = "";

  constructor(private gameService: GameService) {
    addIcons({ pricetag, home, heart, chevronBackOutline, chevronForwardOutline, pricetagOutline })
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
        this.findFavourite();
        this.searchDeal();
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

 

  searchDeal(){
    let dealGame: any[] = [];
    for(let i = 0; i < this.games.length; i++)
    {
      this.gameService.GetDeals(this.games[i].name).subscribe(
        (dealData)=>{
          dealGame = dealData;
        if(dealGame.length > 0)
      {
        this.dealsArray.push(this.games[i].id);
        this.games[i].hasGameDeal = true;
      }
      else{
        this.games[i].hasGameDeal = false;
      }
   
      }
          
      );
      
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
    if (this.gameService.favouriteArray != null) {
      let index = -1;

      for (let i = 0; i < this.gameService.favouriteArray.length; i++) {
        if (this.gameService.favouriteArray[i].id == game.id) {
          index = i;
          break;
        }
      }
      if (game.isFav) {
        game.isFav = false;

        this.gameService.favouriteArray.splice(index, 1);
        this.gameService.saveFavourite()
      }
      else {
        game.isFav = true;
        if (index == -1) {
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
        this.findFavourite();
      }
    )
  }

}


