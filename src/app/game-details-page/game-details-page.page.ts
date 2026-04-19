import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonText, IonButton, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, IonItem } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { GameService } from '../services/game-service';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { home, shareOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Share } from '@capacitor/share';
import { share } from 'rxjs';




@Component({
  selector: 'app-game-details-page',
  templateUrl: './game-details-page.page.html',
  styleUrls: ['./game-details-page.page.scss'],
  standalone: true,
  imports: [IonIcon, RouterLink, IonText, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem]
})
export class GameDetailsPagePage implements OnInit {

  gameId: number = 0;
  gameName: string = "";
  gameDetails: any;
  arrayGames: any[] = [];
  arrayDlc: any[] = [];
  arrayDeals: any[] = [];
  index: number = 0;
  hasDeal: boolean = false;
  hasDlc: boolean = false;


  constructor(private route: ActivatedRoute, private gameService: GameService) {
    addIcons({ home, shareOutline });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.gameDetails = [];
    this.arrayGames = [];
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameName = this.route.snapshot.paramMap.get('name') ?? "";


    this.gameService.GetGameDetails(this.gameId).subscribe(
      (gameData) => {
        this.gameDetails = gameData;
        console.log(this.gameDetails);
      }
    )

    this.gameService.GetDeals(this.gameName).subscribe(
      (dealsData) => {
        this.arrayGames = dealsData;
        console.log(this.arrayGames);
        for (let i = 0; i < this.arrayGames.length; i++) {
          if (this.gameName == this.arrayGames[i].external) {
            this.index = i;
            this.hasDeal = true;
            console.log(dealsData);
          }
        }
      }
    )

    this.gameService.GetGameDlc(this.gameId).subscribe(
      (dlcData) => {
        this.arrayDlc = dlcData.results;
        if (this.arrayDlc.length > 0)
          this.hasDlc = true;
        console.log(this.arrayDlc);
      }
    )
  }

  async shareContent() {
    await Share.share({
       
      url: `http://playsaver-c0422.web.app/game-details-page/${this.gameId}/${this.gameName}`,
    });
  }
}
