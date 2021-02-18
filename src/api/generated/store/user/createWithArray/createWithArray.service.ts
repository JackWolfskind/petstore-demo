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

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {UserService} from '../../../controllers/User';

@Injectable()
export class CreateWithArrayFormService {
  form: FormGroup;
  constructor(
    private userService: UserService,
  ) {
    this.form = new FormGroup({
      body: new FormArrayExtended(() => (
        new FormGroup({
          id: new FormControl(undefined, []),
          username: new FormControl(undefined, []),
          firstName: new FormControl(undefined, []),
          lastName: new FormControl(undefined, []),
          email: new FormControl(undefined, []),
          password: new FormControl(undefined, []),
          phone: new FormControl(undefined, []),
          userStatus: new FormControl(undefined, []),
        }, [Validators.required])), [], [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.userService.createWithArray(data);
  }
}
