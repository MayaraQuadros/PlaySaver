import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, RouterLink, IonCol, IonGrid, IonRow ,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  games:any[]=[];
 
  
  constructor(private gameService:GameService) {}
    
  ionViewWillEnter()
  {
    this.loadGames();
  }

  loadGames(){
    this.gameService.GetGameData(this.gameService.page).subscribe(
      (data)=>{
        this.games = data.results;
        console.log(this.games);
      }
    )
  }

  onPrevButton(){
    this.gameService.prevPage();
    this.loadGames();
  }

  onNextButton(){
    this.gameService.nextPage();
    this.loadGames();

  }

}
