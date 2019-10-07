import { AbstractForm } from 'moh-common-lib';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export class CreateFacilityForm extends AbstractForm {
  links = environment.links;

  constructor(protected router: Router) {
    super(router);
  }

  continue() {
    console.log('CreateFacilityForm - continue', this.form.controls);
    // TODO: navigate to next page by default
    // let each component override method if desired (e.g. for backend check)
  }
}
