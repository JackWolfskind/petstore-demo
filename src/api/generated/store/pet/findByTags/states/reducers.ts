/* tslint:disable:max-line-length */
/**
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 * 1.0.5
 * Swagger Petstore
 * http://swagger.io/terms/
 * apiteam@swagger.io
 * Apache 2.0
 * http://www.apache.org/licenses/LICENSE-2.0.html
 * petstore.swagger.io/v2
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface FindByTagsState {
  data: __model.Pet[] | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialFindByTagsState: FindByTagsState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Pet_FindByTags';
export const getFindByTagsStateSelector = createFeatureSelector<FindByTagsState>(selectorName);

export function FindByTagsReducer(
  state: FindByTagsState = initialFindByTagsState,
  action: actions.FindByTagsAction): FindByTagsState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
