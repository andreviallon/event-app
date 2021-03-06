import { InitVenueState } from './venue.actions';
import { IVenue } from './venue.model';
import { State, Selector, Action, StateContext, createSelector, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';

export class VenueStateModel {
  venues: IVenue[];
}

export const VENUE_STATE = new StateToken<VenueStateModel>('venueState');

@State<VenueStateModel>({
  name: VENUE_STATE
})

@Injectable()
export class VenueState {

  @Selector()
  static getVenues(state: VenueStateModel) {
    return state.venues;
  }

  static getVenue(id: string) {
    return createSelector(
      [VENUE_STATE],
      (state: VenueStateModel): IVenue => {
        return state.venues.find(venue => venue._id === id);
      }
    );
  }

  @Action(InitVenueState)
  @ImmutableContext()
  async initVenueState({ setState }: StateContext<VenueStateModel>, { }: InitVenueState) {
    try {
      const venues = await axios.get('api/v1/venues');

      setState((state: VenueStateModel) => {
        state.venues = venues.data.data;
        return state;
      });
    } catch (err) {
      throw err;
    }
  }
}
