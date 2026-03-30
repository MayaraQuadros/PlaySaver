import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private httpClient:HttpClient){}

  GetGameData():Observable<any>{
    return this.httpClient.get('https://api.rawg.io/api/games?key=38044ee04e384c09a6655fa5a5af962c')
  }
  
}
