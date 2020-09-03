import { IEventOverview, IEventIncTeacherAndVenue } from 'src/app/state/event/event.model';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faEllipsisV, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { getEventOverview } from 'src/app/utils/event-overview';

@Component({
  selector: 'app-manage-event-card',
  template: `
    <div class="card" [routerLink]="['/event', event._id]">
      <div class="card-content">
        <ul class="content flex-container">
          <li *ngFor="let eventProperty of eventOverview.properties" class="list-item">
            <p class="overview-title">{{ eventProperty.title }}</p>
            <p class="overview-content">{{ eventProperty.content }}</p>
          </li>
          <li class="list-ellipsis">
            <div class="dropdown is-right" [ngClass]="{'is-active': showDropdown}">
              <div class="dropdown-trigger">
              <button class="button is-white" (click)="toogleDropdown($event)">
                <fa-icon [icon]="faEllipsisV"></fa-icon>
              </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" (click)="edit()">Edit Event</a>
                  <a class="dropdown-item" (click)="delete()">Delete Event</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./manage-event-card.component.scss']
})
export class ManageEventCardComponent implements OnInit {

  @Input() event: IEventIncTeacherAndVenue;
  @Output() editEvent: EventEmitter<string> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();

  public eventOverview: IEventOverview;
  public faEllipsisV: IconDefinition = faEllipsisV;
  public showDropdown = false;

  ngOnInit() {
    this.eventOverview = getEventOverview(this.event);
  }

  public toogleDropdown(event): void {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  public edit(): void {
    event.stopPropagation();
    this.editEvent.emit(this.event._id);
  }

  public delete(): void {
    event.stopPropagation();
    this.deleteEvent.emit(this.event._id);
  }

  public stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
