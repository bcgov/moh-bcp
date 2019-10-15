import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractHttpService } from 'moh-common-lib';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BCPApiService extends AbstractHttpService {
  protected _headers: HttpHeaders;
  private token: string;
  public hasToken = false;

  constructor(protected http: HttpClient) { 
    super(http);
  }

  protected handleError(error: HttpErrorResponse) {
    throw new Error('Method not implemented.');
  }

  setToken(token: string){
    this.token = token;
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Response-Type': 'application/json',
      'X-Authorization': 'Bearer ' + token
    });
    this.hasToken = true;
  }


}
