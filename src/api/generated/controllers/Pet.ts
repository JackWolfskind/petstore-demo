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

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface UploadImageParams {
  /**
   * ID of pet to update
   * format: int64
   */
  petId: number;
  /** Additional data to pass to server */
  additionalMetadata?: string;
  /** file to upload */
  file?: File;
}

export interface AddPetParams {
  /** Pet object that needs to be added to the store */
  body: __model.Pet;
}

export interface UpdatePetParams {
  /** Pet object that needs to be added to the store */
  body: __model.Pet;
}

export interface FindByStatusParams {
  /** Status values that need to be considered for filter */
  status: StatusFindByStatusParamsEnum[];
}

export type StatusFindByStatusParamsEnum =
  'available' |
  'pending' |
  'sold';

export interface FindByTagsParams {
  /** Tags to filter by */
  tags: string[];
}

export interface GetPetByIdParams {
  /**
   * ID of pet to return
   * format: int64
   */
  petId: number;
}

export interface UpdatePetWithFormParams {
  /**
   * ID of pet that needs to be updated
   * format: int64
   */
  petId: number;
  /** Updated name of the pet */
  name?: string;
  /** Updated status of the pet */
  status?: string;
}

export interface DeletePetParams {
  api_key?: string;
  /**
   * Pet id to delete
   * format: int64
   */
  petId: number;
}

@Injectable()
export class PetService {
  constructor(private http: HttpClient) {}

  /**
   * uploads an image
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/uploadFile
   */
  uploadImage(params: UploadImageParams): Observable<__model.ApiResponse> {
    const pathParams = {
      petId: params.petId,
    };
    const formDataParams = {
      additionalMetadata: params.additionalMetadata,
      file: params.file,
    };
    return this.http.post<__model.ApiResponse>(`/v2/pet/${pathParams.petId}/uploadImage`, formDataParams);
  }

  /**
   * Add a new pet to the store
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/addPet
   */
  addPet(params: AddPetParams): Observable<void> {
    const bodyParams = params.body;

    return this.http.post<void>(`/v2/pet`, bodyParams || {});
  }

  /**
   * Update an existing pet
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/updatePet
   */
  updatePet(params: UpdatePetParams): Observable<void> {
    const bodyParams = params.body;

    return this.http.put<void>(`/v2/pet`, bodyParams || {});
  }

  /**
   * Finds Pets by status
   * Multiple status values can be provided with comma separated strings
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/findPetsByStatus
   */
  findByStatus(params: FindByStatusParams): Observable<__model.Pet[]> {
    const queryParamBase = {
      status: params.status,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<__model.Pet[]>(`/v2/pet/findByStatus`, {params: queryParams});
  }

  /**
   * Finds Pets by tags
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/findPetsByTags
   */
  findByTags(params: FindByTagsParams): Observable<__model.Pet[]> {
    const queryParamBase = {
      tags: params.tags,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<__model.Pet[]>(`/v2/pet/findByTags`, {params: queryParams});
  }

  /**
   * Find pet by ID
   * Returns a single pet
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/getPetById
   */
  getPetById(params: GetPetByIdParams): Observable<__model.Pet> {
    const pathParams = {
      petId: params.petId,
    };
    return this.http.get<__model.Pet>(`/v2/pet/${pathParams.petId}`);
  }

  /**
   * Updates a pet in the store with form data
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/updatePetWithForm
   */
  updatePetWithForm(params: UpdatePetWithFormParams): Observable<void> {
    const pathParams = {
      petId: params.petId,
    };
    const formDataParams = {
      name: params.name,
      status: params.status,
    };
    return this.http.post<void>(`/v2/pet/${pathParams.petId}`, formDataParams);
  }

  /**
   * Deletes a pet
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/pet/deletePet
   */
  deletePet(params: DeletePetParams): Observable<void> {
    const headerParams = new HttpHeaders({
      api_key: params.api_key,
    });
    const pathParams = {
      petId: params.petId,
    };
    return this.http.delete<void>(`/v2/pet/${pathParams.petId}`, {headers: headerParams});
  }
}
