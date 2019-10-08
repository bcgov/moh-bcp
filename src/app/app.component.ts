import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moh-bcp';

  constructor(private headerService: HeaderService) {
    this.headerService.title.subscribe(x => this.title = x);
  }
}
