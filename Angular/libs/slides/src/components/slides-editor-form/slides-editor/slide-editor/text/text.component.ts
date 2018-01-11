import {Component, Input, ViewChild, ElementRef, OnChanges, HostListener, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {TextEditorComponent} from '../text-editor/text-editor.component';
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})

export class TextComponent implements OnChanges{
  @HostListener('dblclick', ['$event']) onDblclick($event){
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextEditorComponent);
    let componentRef = this.textContainer.createComponent(componentFactory);
    (<TextEditorComponent>componentRef.instance).editorContent = this.text;
    this.text='';
 }
  @Input() text: any;
  @Input() event: any;
  @Input() currentIndex: any;
  @Input() BoxIndexToResize: any;
  // @ViewChild('textContainer') textContainer: ElementRef;
  @ViewChild('textContainer', { read: ViewContainerRef }) textContainer: ViewContainerRef;

  ngOnChanges() {
    // if(this.textContainer.nativeElement.children[0] && this.currentIndex === this.BoxIndexToResize) {
    //   this.textContainer.nativeElement.children[0].firstChild.width = this.event.width ;
    //   this.textContainer.nativeElement.children[0].firstChild.height = this.event.height;
    // }
  }
  constructor(private componentFactoryResolver: ComponentFactoryResolver){}
}
