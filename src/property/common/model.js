import { Model, fk } from "redux-orm";

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
