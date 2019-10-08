import { AbstractForm } from 'moh-common-lib';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { createFacilityPageRoutes } from '../create-facility-page-routing';
import { CREATE_FACILITY } from '../create-facility-route-constants';

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
    if (this.form && !this.form.valid){
      return;
    }

    const urlSegment = this.router.url.replace('/' + CREATE_FACILITY, '');
    const index = createFacilityPageRoutes
      .map(x => x.path)
      .indexOf(urlSegment);

    const nextUrl = createFacilityPageRoutes[index + 1].path;
    this.navigate(`/${CREATE_FACILITY}/${nextUrl}`)
  }
}
