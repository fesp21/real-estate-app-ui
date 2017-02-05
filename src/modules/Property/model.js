import { Model, many, fk } from "redux-orm";
import User from './../User/model';

export class Property extends Model {
  static modelName = 'Property';
  static options() {
    return {
      idAttribute : "_id"
    }
  }

  static fields = {
    user: fk('User'),
  }
}
