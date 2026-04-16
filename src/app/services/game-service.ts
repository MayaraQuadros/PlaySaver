import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  page: number = 1;
  favouriteArray: any[] = [];


  constructor(private httpClient: HttpClient, private storage: Storage) { 
        this.storage.create();

  }

  GetGameData(page: number | string): Observable<any> {
    if (typeof page === 'number') {
      return this.httpClient.get(`https://api.rawg.io/api/games?key=38044ee04e384c09a6655fa5a5af962c&page=${page}`)
    }
    else {
      console.log("string triggered");
      return this.httpClient.get(`https://api.rawg.io/api/games?key=38044ee04e384c09a6655fa5a5af962c&search=${page}`)
    }
  }

  GetGameDlc(id:number):Observable<any>{
      return this.httpClient.get(`https://api.rawg.io/api/games/${id}/additions?key=38044ee04e384c09a6655fa5a5af962c`)

  }

  GetGameDetails(id: number): Observable<any> {
    return this.httpClient.get(`https://api.rawg.io/api/games/${id}?key=38044ee04e384c09a6655fa5a5af962c`)
  }
  GetDeals(name: string): Observable<any> {
    return this.httpClient.get(`https://www.cheapshark.com/api/1.0/games?title=${name}&exact=1`)
  }

  nextPage() {
    this.page++;

  }

  prevPage() {
    if (this.page > 1)
      this.page--;
  }

  async saveFavourite() {
    await this.storage.set("favouriteGames", this.favouriteArray);
  }

  async getFavourites()
  {
    this.favouriteArray = await this.storage.get("favouriteGames");
    console.log(this.favouriteArray);
  }
}
