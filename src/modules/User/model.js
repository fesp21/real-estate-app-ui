import { Model, many, fk } from "redux-orm";

export class User extends Model {
  static modelName = 'User';
  static options() {
    return {
      idAttribute : "_id"
    }
  }
}