import { AbstractForm } from 'moh-common-lib';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export class CreateFacilityForm extends AbstractForm {
  links = environment.links;

  constructor(protected router: Router) {
    super(router);
  }

  /**
   *  YOU MAY FREELY OVERRIDE THIS FUNCTION AS NEEDED ON A PAGE BY PAGE BASIS
   *
   *  Default functionality: checks if form is present/valid, then navigates to
   *  next page as ordered in routes file.
   */
  continue() {
    console.log('TODO - override this function in your page.');
  }
}
