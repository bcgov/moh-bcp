import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeocoderService } from 'moh-common-lib';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BCPGeocoderService extends GeocoderService {
  // protected _headers: HttpHeaders;
  // private token: string;
  // public hasToken = false;

  constructor(protected http: HttpClient) { 
    super(http);
  }

//   // https://geocoder.api.gov.bc.ca/addresses.json?minScore=50&maxResults=5&echo=false&brief=true&autoComplete=true&addressString=784+Hock
//   lookup(address: string): Observable<GeoAddressResult[]> {
//     const params = new HttpParams()
//         .set('minScore', '50')
//         .set('maxResults', '10')
//         .set('echo', 'false')
//         .set('brief', 'false') // API splits address string up into sub-attributes, like city  / street name
//         .set('autoComplete', 'true')
//         .set('matchPrecisionNot', 'LOCALITY,STREET,BLOCK,INTERSECTION')
//         .set('addressString', address);

//     return this.get(this.ADDRESS_URL, params).pipe(map(this.processResponse));
// }



}
