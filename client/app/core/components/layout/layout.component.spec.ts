import { TestBed, async } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
describe('LayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent
      ],
    }).compileComponents();
  }));
  it('should create the layout', async(() => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const layout = fixture.debugElement.componentInstance;
    expect(layout).toBeTruthy();
  }));
  it(`should have as title 'layout'`, async(() => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const layout = fixture.debugElement.componentInstance;
    expect(layout.title).toEqual('layout');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to layout!');
  }));
});
