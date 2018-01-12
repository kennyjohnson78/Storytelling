import {Component, Input, ViewChild, ElementRef, OnChanges, HostListener, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter} from '@angular/core';
import {TextEditorComponent} from '../text-editor/text-editor.component';
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})

export class TextComponent implements OnChanges{
  @HostListener('dblclick', ['$event']) onDblclick($event){
    this.viewMode =false;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextEditorComponent);
    let componentRef = this.textEditorContainer.createComponent(componentFactory);
    (<TextEditorComponent>componentRef.instance).editorContent = this.text;
    this.text='';
    (<TextEditorComponent>componentRef.instance).textTosave.subscribe((text)=>{
      this.text = text;
      this.textEditorContainer.clear();
      this.viewMode =true;
    })
 }
  viewMode =true;
  @Input() text: any;
  @ViewChild('textContainer') textContainer: ElementRef;
  @ViewChild('textEditorContainer', { read: ViewContainerRef }) textEditorContainer: ViewContainerRef;

  ngOnChanges() {

    // if(this.textContainer.nativeElement.children[0] && this.currentIndex === this.BoxIndexToResize) {
    //   this.textContainer.nativeElement.children[0].firstChild.width = this.event.width ;
    //   this.textContainer.nativeElement.children[0].firstChild.height = this.event.height;
    // }
  }
  constructor(private componentFactoryResolver: ComponentFactoryResolver){}
}
