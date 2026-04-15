import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, } from '@angular/router';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonIcon, IonButton, IonButtons, IonSearchbar } from '@ionic/angular/standalone';




@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.page.html',
  styleUrls: ['./favourite-page.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonCol, IonGrid, IonRow , IonIcon, RouterLink, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
