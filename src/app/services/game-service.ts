import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  page: number = 1;

  constructor(private httpClient: HttpClient) { }

  GetGameData(page: number): Observable<any> {
    return this.httpClient.get(`https://api.rawg.io/api/games?key=38044ee04e384c09a6655fa5a5af962c&page=${page}`)
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

}
