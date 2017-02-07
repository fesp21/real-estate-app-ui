import orm from './orm';
import map from 'lodash/map';
import { ACTION_TYPES as PROPERTY_ACTIONS } from './../modules/Property/actions';
import { ACTION_TYPES as AUTH_ACTIONS } from './../modules/Auth/actions';
import { ACTION_TYPES as USER_ACTIONS } from './../modules/User/actions';


export function ormReducer(state, action) {
  const session = orm.session(state);
  const { Property, User } = session;
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS: {
      let user = action.payload;
      if (!User.hasId(user._id)) { User.create(user); }
      break;
    }
    case USER_ACTIONS.USER_UPDATE_SUCCESS: {
      let user = action.payload;
      if (!User.hasId(user._id)) {
        User.create(user);
      } else {
        User.withId(user._id).update(action.payload);
      }
      break;
    }
    case PROPERTY_ACTIONS.PROPERTY_SUCCESS: {
      const propertyCollections = action.payload.data;
      map(propertyCollections, (entity) => {
        let user = entity.user;
        if (!user) return;
        if (!User.hasId(user._id)) { User.create(user); }
        Property.hasId(entity._id) ? Property.withId(entity._id).update({ ...entity, user: user._id }) : Property.create({ ...entity, user: user._id });
      });
      break;
    }
    case PROPERTY_ACTIONS.PROPERTY_FAVORITE_OPTIMISTIC_UPDATE: {
      const { itemID, newItemAttributes } = action.payload.params;
      if (Property.hasId(itemID)) {
        const modelInstance = Property.withId(itemID);
        modelInstance.update(newItemAttributes);
      }
      break;
    }
    case PROPERTY_ACTIONS.PROPERTY_FAVORITE_SUCCESS: {
      if (action.payload && action.payload.data) {
        const response = action.payload.data;
        if (Property.hasId(response._id)) {
          const property = Property.withId(response._id);
          property.update({ ...response, user: response.user._id });
        }
      }
      break;
    }
    default:
      break;
  }
  return session.state;
}
