
import { Component, OnInit, Input, Inject, HostListener, Output, EventEmitter} from '@angular/core';
import { environment } from '../../../../../../../../apps/default/src/environments/environment';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @HostListener('document:click', ['$event']) clickedOutside($event){
   this.textTosave.emit(this.editorContent);
 }
  private editorOptions: Object;//option of the text editor
  @Input() width: number;
  @Input() height: number;
  @Input() editorContent : any;
  @Output() textTosave: EventEmitter<string> = new EventEmitter();
  constructor() {
    let baseURL = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseURL += `:${environment.backend.port}`;
    }
    this.editorOptions = {
      toolbarInline: true,
      iframe: true,
      initOnClick :false,
      heightMin: 200,
      heightMax: 400,
      widthMax: 1000,
      charCounterMax: 3000,
      toolbarSticky: false,
      imageUploadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`,
      imageManagerLoadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`
    };
  }

  ngOnInit() {

  }
}
