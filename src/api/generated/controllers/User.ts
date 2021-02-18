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

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface CreateWithArrayParams {
  /** List of user object */
  body: __model.User[];
}

export interface CreateWithListParams {
  /** List of user object */
  body: __model.User[];
}

export interface GetUserByNameParams {
  /** The name that needs to be fetched. Use user1 for testing.  */
  username: string;
}

export interface UpdateUserParams {
  /** name that need to be updated */
  username: string;
  /** Updated user object */
  body: __model.User;
}

export interface DeleteUserParams {
  /** The name that needs to be deleted */
  username: string;
}

export interface LoginParams {
  /** The user name for login */
  username: string;
  /** The password for login in clear text */
  password: string;
}

export interface CreateUserParams {
  /** Created user object */
  body: __model.User;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Creates list of users with given input array
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/createUsersWithArrayInput
   */
  createWithArray(params: CreateWithArrayParams): Observable<void> {
    const bodyParams = params.body;

    return this.http.post<void>(`/v2/user/createWithArray`, bodyParams || {});
  }

  /**
   * Creates list of users with given input array
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/createUsersWithListInput
   */
  createWithList(params: CreateWithListParams): Observable<void> {
    const bodyParams = params.body;

    return this.http.post<void>(`/v2/user/createWithList`, bodyParams || {});
  }

  /**
   * Get user by user name
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/getUserByName
   */
  getUserByName(params: GetUserByNameParams): Observable<__model.User> {
    const pathParams = {
      username: params.username,
    };
    return this.http.get<__model.User>(`/v2/user/${pathParams.username}`);
  }

  /**
   * Updated user
   * This can only be done by the logged in user.
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/updateUser
   */
  updateUser(params: UpdateUserParams): Observable<void> {
    const pathParams = {
      username: params.username,
    };
    const bodyParams = params.body;

    return this.http.put<void>(`/v2/user/${pathParams.username}`, bodyParams || {});
  }

  /**
   * Delete user
   * This can only be done by the logged in user.
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/deleteUser
   */
  deleteUser(params: DeleteUserParams): Observable<void> {
    const pathParams = {
      username: params.username,
    };
    return this.http.delete<void>(`/v2/user/${pathParams.username}`);
  }

  /**
   * Logs user into the system
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/loginUser
   */
  login(params: LoginParams): Observable<string> {
    const queryParamBase = {
      username: params.username,
      password: params.password,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<string>(`/v2/user/login`, {params: queryParams});
  }

  /**
   * Logs out current logged in user session
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/logoutUser
   */
  logout(): Observable<void> {
    return this.http.get<void>(`/v2/user/logout`);
  }

  /**
   * Create user
   * This can only be done by the logged in user.
   * http://petstore.swagger.io/swagger/swagger-ui.html#!/user/createUser
   */
  createUser(params: CreateUserParams): Observable<void> {
    const bodyParams = params.body;

    return this.http.post<void>(`/v2/user`, bodyParams || {});
  }
}
