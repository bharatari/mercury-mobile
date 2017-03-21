import { Component, Input } from '@angular/core';

/*
  Generated class for the Post component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'post-component',
  templateUrl: 'post.html'
})
export class PostComponent {
  @Input() title;
  @Input() image;
  @Input() category;
  @Input() content;

  constructor() { }
}
