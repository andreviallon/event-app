import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="flex-container">
      <h1>{{ title }}</h1>
      <button *ngIf="addButton" class="button is-link" (click)="create.emit()">{{ buttonName }}</button>
    </div>
  `,
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input() title: string;
  @Input() buttonName: string;
  @Input() addButton: boolean;

  @Output() create: EventEmitter<void> = new EventEmitter();

}
