import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { InitEventState, DeleteEvent, EditEvent } from 'src/app/state/event/event.actions';
import { EventState } from 'src/app/state/event/event.state';
import { Observable } from 'rxjs';
import { IEventOverview } from 'src/app/state/event/event.model';

@Component({
  selector: 'app-manage-events-page',
  templateUrl: './manage-events-page.component.html',
  styleUrls: ['./manage-events-page.component.scss']
})
export class ManageEventsPageComponent {

  @Select(EventState.getEventsOverview) events$: Observable<IEventOverview[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new InitEventState);
  }

  editEvent($event: string): void {
    this.store.dispatch(new EditEvent($event));
  }

  deleteEvent($event: string): void {
    this.store.dispatch(new DeleteEvent($event));
  }

}
