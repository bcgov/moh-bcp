import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationContainerService {

  $isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  $submitLabelSubject: BehaviorSubject<string> = new BehaviorSubject('Continue');
  $useDefaultColorSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  $continueBtnSubject: Subject<null> = new Subject();


  // Observables
  $isLoading = this.$isLoadingSubject.asObservable();
  $submitLabel = this.$submitLabelSubject.asObservable();
  $continueBtn = this.$continueBtnSubject.asObservable();
  $useDefaultColor = this.$useDefaultColorSubject.asObservable();

  constructor() { }
}
