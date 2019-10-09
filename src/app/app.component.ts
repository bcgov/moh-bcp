import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';
import * as version from '../version.GENERATED';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moh-bcp';

  constructor(private headerService: HeaderService) {
    version.success
      ? console.log('%c' + version.message, 'color: #036; font-size: 20px; background-color: white;')
      : console.error(version.message);
  }

  ngOnInit() {
    this.headerService.title.subscribe(x => this.title = x);
  }
}
