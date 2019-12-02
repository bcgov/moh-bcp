import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bcp-review-container',
    templateUrl: './review-container.component.html',
    styleUrls: ['./review-container.component.scss'],
})
export class ReviewContainerComponent implements OnInit {
    @Input() hideReviewSection: boolean = false;
    @Input() header: string | null;
    @Input() redirectPath: string | null;
    @Input() sectionItems: any | null;
    @Input() showCheckBoxList: boolean = false;

    // Display as print view - no icons, no grey boxes
    @Input() displayPrintView: boolean = false;

    constructor(private router: Router) {}

    ngOnInit() {}

    redirect(routeName: string) {
        this.router.navigate([routeName]);
    }
}
