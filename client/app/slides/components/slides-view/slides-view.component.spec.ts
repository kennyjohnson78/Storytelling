import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TitleSlideComponent, FullScreenGraphSlideComponent, LeftGraphRightTextSlideComponent, RightGraphLeftTextSlideComponent, TextSlideComponent} from './slide-types';
import { SlidesViewComponent } from './slides-view.component';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NotifBarService } from "app/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SlidesViewComponent', () => {
  let component: SlidesViewComponent;
  let fixture: ComponentFixture<SlidesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesViewComponent,
        TitleSlideComponent,
        FullScreenGraphSlideComponent,
        LeftGraphRightTextSlideComponent,
        RightGraphLeftTextSlideComponent,
        TextSlideComponent],
      imports : [
        HttpModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers :[NotifBarService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
