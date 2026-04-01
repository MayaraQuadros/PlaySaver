import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-details-page',
  templateUrl: './game-details-page.page.html',
  styleUrls: ['./game-details-page.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonBackButton, RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GameDetailsPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
