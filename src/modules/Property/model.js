import { Model, many, fk } from "redux-orm";

export class Property extends Model {
  static modelName = 'Property';
  static options() {
    return {
      idAttribute : "_id"
    }
  }
  // static get fields() {
  //   return {
  //     comments : many("Comment")
  //   };
  // }
}

// export class Comment extends Model {
//   static modelName = 'Comment';
//   static options() {
//     return {
//       idAttribute : "_id"
//     }
//   }
//   static get fields() {
//     return {
//       user_id : fk("User")
//       // property : ("Comment")
//     };
//   }
// }

export class User extends Model {
  static modelName = 'User';
  static options() {
    return {
      idAttribute : "_id"
    }
  }
}