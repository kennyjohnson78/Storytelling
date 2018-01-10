import {Component, ViewEncapsulation, ViewChildren,OnInit, ViewChild, ElementRef, QueryList, HostListener, ChangeDetectionStrategy} from '@angular/core';
import { Slide } from '../../../../models/slide';
import { MatDialog, MatDialogRef } from '@angular/material';
import {SlideService} from '../../../../services';
import {ChartsBuilderComponent} from './charts-builder';
import {TextEditorComponent} from './text-editor/text-editor.component';
import {Chart} from '../../../../../../charts';
import { ActivatedRoute, Router } from '@angular/router';
import { GridsterConfig, GridsterItem, GridsterConfigS }  from 'angular-gridster2';

@Component({
  selector: 'app-slides-drag-drop',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss'],
  providers: [SlideService],
  changeDetection: ChangeDetectionStrategy.OnPush


})
export class SlideEditorComponent implements OnInit{
  slide: any;
  isOpened =false;
  public slideIndex: number;  // slide index
  boxIndexToResize = -1;
  id: any;
  private width;
  idSlides: any;
  private itemPositions: Array<any> = [];

  constructor(
    private dialog: MatDialog,
    private slideService : SlideService,
    private route : ActivatedRoute,
    private router: Router,
    private element: ElementRef) {}

options: GridsterConfigS;
dashboard: Array<GridsterItem>;
remove: boolean;

static eventStop(item, itemComponent, event) {
  console.info('eventStop', item, itemComponent, event);
}

static itemChange(item, itemComponent) {
  console.info('itemChanged', item, itemComponent);
}

static itemResize(item, itemComponent) {
  console.info('itemResized', item, itemComponent);
}

static itemInit(item, itemComponent) {
  console.info('itemInitialized', item, itemComponent);
}

static itemRemoved(item, itemComponent) {
  console.info('itemRemoved', item, itemComponent);
  if (this.slide.boxes[index]) {
    this.slide.boxes.splice(index, 1);
  }
}

static gridInit(grid) {
  console.info('gridInit', grid);
}

static gridDestroy(grid) {
  console.info('gridDestroy', grid);
}

emptyCellClick(event, item) {
  console.info('empty cell click', event, item);
  this.slide.boxes.push(item);
}

ngOnInit() {
  this.route.params.subscribe(params => {
     this.idSlides = params['idSlides'];
     this.id = params['id'];
   });
   this.slide = this.route.snapshot.data.slide;
   this.slide.index = this.id;
   if(!this.slide.boxes) {
     this.slide.boxes = []
   }
  this.gridConfig = {
    gridType: 'fixed',
    compactType: 'none',
    itemInitCallback: SlideEditorComponent.itemInit,
    itemRemovedCallback: SlideEditorComponent.itemRemoved,
    margin: 20,
    outerMargin: true,
    mobileBreakpoint: 640,
    minCols: 1,
    maxCols: 100,
    minRows: 1,
    maxRows: 100,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 50,
    fixedRowHeight: 50,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: true,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    emptyCellClickCallback: this.emptyCellClick.bind(this),
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    draggable: {
      delayStart: 0,
      enabled: true,
      ignoreContentClass: 'gridster-item-content',
      ignoreContent: false,
      dragHandleClass: 'drag-handler',
      stop: undefined
    },
    resizable: {
      delayStart: 0,
      enabled: true,
      stop: undefined,
      handles: {
        s: true,
        e: true,
        n: true,
        w: true,
        se: true,
        ne: true,
        sw: true,
        nw: true
      }
    },
    swap: true,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: {north: true, east: true, south: true, west: true},
    pushResizeItems: false,
    displayGrid: 'onDrag&Resize',
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false
  };

  this.dashboard = [
  ];
}

changedOptions() {
  if (this.options.api && this.options.api.optionsChanged) {
    this.options.api.optionsChanged();
  }
}

removeItem($event, item) {
  $event.preventDefault();
  $event.stopPropagation();
  this.dashboard.splice(this.dashboard.indexOf(item), 1);
}

addItem() {
  this.dashboard.push({});
}

destroy() {
  this.remove = !this.remove;
}
  //
  // openChartBuilder() {
  //   const dialog = this.dialog.open(ChartsBuilderComponent, {height: '95%', width: '90%'});
  //   dialog.afterClosed().subscribe(result => {
  //     if (result !== 'CANCEL') {
  //       console.log('The dialog was closed');
  //       this.addBox(result, 'chart');
  //     }
  //   });
  // }
  //
  //
  // refreshBox(index, box) {
  //   this.removeBox(index);
  //   box = {
  //     config : this._generateItemConfig( box.config.col, box.config.row, box.config.sizex, box.config.sizey),
  //     text: box.text,
  //     chart: box.chart,
  //     height: box.height,
  //     width: box.width
  //   };
  //   this.slide.boxes.push(box);
  // }
  //
  // addBox(objectToAdd, type) {
  //   const push = new GridsterPush(gridsterItemComponent); // init the service
  //   gridsterItemComponent.$item.rows += 1; // move your item
  //   push.pushItems(push.fromEast);  // push items from a direction
  //   push.setPushedItems(); // save the items pushed
  //   push.restoreItems(); // restore to initial state the pushed items
  //   push.checkPushBack(); // check for items restore to original position
  //
  // }
  //
  // addText() {
  //   const dialog = this.dialog.open(TextEditorComponent, {height: '60%', width: '90%'});
  //   dialog.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log('The dialog was closed');
  //       this.addBox(result, 'text');
  //     }
  //   });
  // }
  //
  // removeBox(index: number) {
  //   if (this.slide.boxes[index]) {
  //     this.slide.boxes.splice(index, 1);
  //   }
  // }
  //
  // editBox(index: number) {
  //   if (this.slide.boxes[index].text) {
  //     const dialog = this.dialog.open(TextEditorComponent, {height: '60%', width: '95%'});
  //     dialog.componentInstance.text = this.slide.boxes[index].text;
  //     dialog.afterClosed().subscribe(result => {
  //       if (result !== 'CANCEL') {
  //         this.slide.boxes[index].text = result;
  //       }
  //     });
  //   }
  //   if (this.slide.boxes[index].chart) {
  //     const dialog = this.dialog.open(ChartsBuilderComponent, {height: '95%', width: '95%'});
  //     dialog.componentInstance.chartType = this.slide.boxes[index].chart.chartType;
  //     dialog.componentInstance.inputOptions = this.slide.boxes[index].chart.chartOptions;
  //     dialog.componentInstance.inputData = this.slide.boxes[index].chart.data;
  //     dialog.afterClosed().subscribe(result => {
  //       console.log(result);
  //       if (result !== 'CANCEL') {
  //         this.slide.boxes[index].chart = result;
  //       }
  //     });
  //   }
  // }
  //
  // onResize(index: number, event: NgGridItemEvent): void {
  //   this.slide.boxes[index].width = event.width ;
  //   this.slide.boxes[index].height = event.height;
  //   this.event = event;
  //   this.boxIndexToResize = index;
  // }
  //
  // confirmSlide(slide){
  //   this.slideService.confirmSlides(slide, this.id, this.idSlides)
  //     .subscribe(
  //       res => {
  //         this.router.navigate(['/slides/display/', this.idSlides])
  //       });
  // }
  //
  // private _generateItemConfig(col, row, sizex, sizey): NgGridItemConfig {
  //   return {'dragHandle': '.handle', 'col': col, 'row': row, 'sizex': sizex, 'sizey': sizey};
  // }
  //
  // onDragStop(index, item , box) {
  //   console.log(item, this.element.nativeElement.offsetWidth);
  //   if (item.width + item.left > this.element.nativeElement.offsetWidth || item.row * item.sizey > this.element.nativeElement.offsetHeight) {
  //     this.refreshBox(index, box);
  //   }
  // }
  //
  // openMenu(){
  //   console.log("yessss");
  // }
}
