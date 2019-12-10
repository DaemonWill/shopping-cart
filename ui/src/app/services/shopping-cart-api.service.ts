import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartApiService {
  constructor(private http: HttpClient) { }

  private baseUrl : string = "localhost:5000/api/";

  public postData(endpoint : string, query : any) : Observable<any>{
    let url = this.baseUrl + endpoint;
    let data = encodeURIComponent(JSON.stringify(query));
    return this.http.post(url, data);
  }

  public getData(endpoint : string) : Observable<any>{
    let url = this.baseUrl + endpoint;
    return this.http.get(url);
  }

  public putData(endpoint : string, query : any) : Observable<any>{
    let url = this.baseUrl + endpoint;
    let data = encodeURIComponent(JSON.stringify(query));
    return this.http.put(url, data);
  }
}
