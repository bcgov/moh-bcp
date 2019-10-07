import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFacilityForm } from '../../models/create-facility-form';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent extends CreateFacilityForm implements OnInit {

  constructor(protected router: Router) {
    super(router);
   }

  ngOnInit() {
  }

}
