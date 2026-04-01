import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute} from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';



@Component({
  selector: 'app-game-details-page',
  templateUrl: './game-details-page.page.html',
  styleUrls: ['./game-details-page.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GameDetailsPagePage implements OnInit {

  gameId:number = 0;
  gameDetails:any;
  

  constructor(private route: ActivatedRoute, private gameService:GameService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));

   
      this.gameService.GetGameDetails(this.gameId).subscribe(
      (data) => { 
        this.gameDetails = data; 
        console.log(this.gameDetails);
      }
    )
    }
    
    
  

}
