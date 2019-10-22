import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/review-container/review-container.component';
import { CreateFacilityDataService } from '../../../services/create-facility-data.service';

@Component({
  selector: 'bcp-review-facility-mailing-info',
  templateUrl: './review-facility-mailing-info.component.html',
  styleUrls: ['./review-facility-mailing-info.component.scss']
})
export class ReviewFacilityMailingInfoComponent implements OnInit {

  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor(public dataService: CreateFacilityDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    
    this.review.redirectPath = ROUTES_FACILITY.FACILITY.fullpath;
    this.review.header = 'Facility Mailing Address';

    const items = [
        [
            {
                label: 'Mailing address',
                value: this.dataService.facInfoMailAddress,
            },
            { label: 'Mailing city', value: this.dataService.facInfoMailCity },            
            { label: 'Mailing province', value: this.dataService.facInfoMailProvince },
            { label: 'Mailing postal code', value:  this.dataService.facInfoMailPostalCode }
        ],
    ];
    this.review.sectionItems = items;
}

}
