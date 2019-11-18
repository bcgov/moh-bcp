import { Component, OnInit } from '@angular/core';
import { HeaderService } from './services/header.service';
import * as version from '../version.GENERATED';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SplunkLoggerService } from './services/splunk-logger.service';
import { CommonLogEvents } from 'moh-common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'moh-bcp';

  constructor(private headerService: HeaderService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private splunkLogger: SplunkLoggerService) {
    version.success
      ? console.log('%c' + version.message, 'color: #036; font-size: 20px; background-color: white;')
      : console.error(version.message);
  }

  ngOnInit() {
    this.headerService.title.subscribe(x => this.title = x);
    this.updateTitleOnRouteChange();
  }

  /**
   * Listen to every route change, and update the page title based on the
   * 'title' property in the route's data.
   */
  private updateTitleOnRouteChange() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data: { title?: string }) => {
      console.log( data );
      this.setTitle(data.title);
      this.splunkLogger.log({
        event: CommonLogEvents.navigation,
        title: data.title ? data.title : this.title,
        url: this.router.url,
      });
    });
  }

  /** Set the page title. Includes basic formatting and fallback */
  private setTitle(title?: string) {
    if (title) {
      this.titleService.setTitle(`${this.title} | ${title}`);
    } else {
      // Default title
      this.titleService.setTitle(this.title);
    }
  }
}
