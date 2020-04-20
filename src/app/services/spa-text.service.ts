import { Injectable } from '@angular/core';
import { AbstractHttpService } from 'moh-common-lib';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, filter } from 'rxjs/operators';

// List of all text keys to be fetched from the server.
const textKeys = {
  SPA_TEXT_UPDATE_FACILITY_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_HOME_PAGE_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_HOME_PAGE_CONTENT: '',
  SPA_TEXT_UPDATE_FACILITY_ADMIN_FAC_INFO_PAGE_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_ADMIN_FAC_INFO_PAGE_DESCRIPTION: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_DESCRIPTION: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_ADDRESS_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_ADDRESS_DESCRIPTION: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_BCP_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_BCP_DESCRIPTION: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_ADMIN_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_ADMIN_DESCRIPTION: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_FAC_NUM_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_FAC_NUM_DESCRIPTION: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_OTHER_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_CHANGE_CANCEL_PAGE_OTHER_DESCRIPTION: '',
  SPA_TEXT_UPDATE_FACILITY_REVIEW_PAGE_TITLE: '',
  SPA_TEXT_UPDATE_FACILITY_REVIEW_PAGE_DESCRIPTION: '',
  SPA_TEXT_REGISTER_FACILITY_HOME_PAGE_TITLE: '',
  SPA_TEXT_REGISTER_FACILITY_HOME_PAGE_CONTENT: '',
  SPA_TEXT_REGISTER_FACILITY_ADMIN_INFO_PAGE_TITLE: '',
  SPA_TEXT_REGISTER_FACILITY_ADMIN_INFO_PAGE_DESCRIPTION: '',
  SPA_TEXT_REGISTER_FACILITY_ADMIN_INFO_PAGE_TIP_TITLE: '',
  SPA_TEXT_REGISTER_FACILITY_ADMIN_INFO_PAGE_TIP_CONTENT: '',
  SPA_TEXT_REGISTER_FACILITY_FAC_INFO_PAGE_TITLE: '',
  SPA_TEXT_REGISTER_FACILITY_FAC_INFO_PAGE_DESCRIPTION: '',
  SPA_TEXT_REGISTER_FACILITY_FAC_INFO_PAGE_TIP1_TITLE: '',
  SPA_TEXT_REGISTER_FACILITY_FAC_INFO_PAGE_TIP1_CONTENT: '',
  SPA_TEXT_REGISTER_FACILITY_FAC_INFO_PAGE_BCP_TITLE: '',
  SPA_TEXT_REGISTER_FACILITY_FAC_INFO_PAGE_BCP_DESCRIPTION: '',
};

// Used in HTTP request
const stringifiedTextKeys = JSON.stringify(textKeys);

export type SpaTextResponse = typeof textKeys;


/**
 * Responsible for retrieving values from the spa-env-server on OpenShift.
 *
 * Subscribe to SpaTextService.values() to get the env values.
 */
@Injectable({
  providedIn: 'root'
})
export class SpaTextService extends AbstractHttpService {

  public textValues: SpaTextResponse = textKeys;
  protected _isLoading: boolean = false;

  protected _headers: HttpHeaders = new HttpHeaders({
    SPA_TEXT_NAME: stringifiedTextKeys,
  });

  private _values = new BehaviorSubject<SpaTextResponse>( null );
  /** The values retrieved from the SpaEnv server. */
  public values: Observable<SpaTextResponse> = this._values.asObservable()
    .pipe(filter(x => !!x)); // filter null response out, init value

  constructor(protected http: HttpClient) {
    super(http);

    if (this._isLoading) {
      return;
    }
    this._isLoading = true;

    this.loadText().subscribe(response => {
      this._values.next(response);
      this.textValues = response;
    });
  }

  private loadText() {
    const url = environment.api.text;

    // When the SpaEnv server is being deployed it can return an HTML error
    // page, and it should resolve shortly, so we try again.
    return this.post<SpaTextResponse>(url, null).pipe(retry(3));
  }

  protected handleError(error: HttpErrorResponse) {
    // console.log( 'Error handleError: ', error );

    if (error.error instanceof ErrorEvent) {
      // Client-side / network error occured
      console.error('An error occured: ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);
    }

    // TODO: Add logging.
    // this.logService.logHttpError(error);

    // A user facing error message /could/ go here; we shouldn't log dev info through the throwError observable
    return throwError('Something went wrong with the network request.');
  }
}
