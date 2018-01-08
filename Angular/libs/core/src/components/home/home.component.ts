import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AuthenticationState, getLoggedIn } from '@labdat/authentication-state';

import { SlidesService, Slides } from '@labdat/slides';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  slides: Array<Slides> = [];
  private length = this.slides.length;
  showSlidesList: boolean;
  noResult: boolean;
  noPublish: boolean;
  private states: Array<string>;
  private selectedValue: string;
  private toSearch;
  private pageSize = 6;
  private pageIndex = 0;
  pageEvent: PageEvent;

  constructor(private slidesService: SlidesService, private store: Store<AuthenticationState>) {}

  ngOnInit() {
    this.showSlidesList = false;
    this.noResult = false;
    this.noPublish = false;
    this.states = ['Public'];
    this.selectedValue = 'Public';
    this.toSearch = { title: '', filter: 'Public' };
    this.loggedIn$ = this.store.select(getLoggedIn);
  }

  searchSlides(searchText) {
    //show slides and hide logo
    this.showSlidesList = true;
    //get search result
    this.toSearch.title = searchText;
    this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize).subscribe(slides => {
      this.slides = slides[0];
      this.length = slides[1];
      if (this.slides.length === 0) this.noResult = true;
      else {
        this.noResult = false;
      }
    });
  }

  getAllslides() {
    this.showSlidesList = true;
    this.toSearch.title = '';
    this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize).subscribe(slides => {
      this.slides = slides[0];
      this.length = slides[1];
      if (this.slides.length === 0) {
        this.noPublish = true;
      } else {
        this.noPublish = false;
      }
    });
  }

  nextPage($event) {
    this.pageEvent = $event;
    this.pageIndex = $event.pageIndex;
    console.log('next', $event.pageIndex);
    this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize).subscribe(slides => {
      this.slides = slides[0];
      this.length = slides[1];
    });
  }
}
