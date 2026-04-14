import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonIcon, IonButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, heart, pricetagOutline } from 'ionicons/icons';
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
  favouriteArray: any[] = [];


  constructor(private gameService: GameService, private storage: Storage) {
    addIcons({ heart, chevronBackOutline, chevronForwardOutline, pricetagOutline })
    this.storage.create();
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
        for(let j = 0; j < this.favouriteArray.length; j++)
        {
          for(let i = 0; i < this.games.length; i++)
          {
            if(this.favouriteArray[j].id == this.games[i].id){
              this.games[i].isFav = true;
            }
          }
        }
      }
    )
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
        }
      );
    }
  }

  favouriteClicked(event: Event, game: any) {
    if (game.isFav) {
      game.isFav = false;
      let index = this.favouriteArray.indexOf(game);
      this.favouriteArray.splice(index, 1);
    }
    else {
      game.isFav = true;
      if(this.favouriteArray.includes(game) == false)
      {
        console.log("inside false");
        this.favouriteArray.push(game);
        this.saveFavourite();
      }
      else{
        console.log("inside true");
      }
    }
    console.log(this.favouriteArray);
  }

  async saveFavourite(){
    await this.storage.set("favouriteGames", this.favouriteArray);
  }
  
  async ionViewDidEnter(){
    this.favouriteArray = await this.storage.get("favouriteGames");
    console.log(this.favouriteArray);
  }

}


