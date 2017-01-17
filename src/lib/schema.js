import {ORM} from "redux-orm";
import {Property,User} from '../modules/Property/model';

const schema = new ORM();
schema.register(Property,User);
export default schema;
