import {ORM} from "redux-orm";
import {Property} from '../modules/Property/model';
import {User} from '../modules/User/model';

const schema = new ORM();
schema.register(Property,User);
export default schema;
