import { Component, OnInit } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent extends CreateFacilityForm implements OnInit {

  constructor(protected router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}
