import { Model, many, fk } from "redux-orm";

export class Property extends Model {
  static modelName = 'Property';
  static options() {
    return {
      idAttribute : "_id"
    }
  }
}

export class User extends Model {
  static modelName = 'User';
  static options() {
    return {
      idAttribute : "_id"
    }
  }
}