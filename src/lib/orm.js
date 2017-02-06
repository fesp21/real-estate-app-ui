import { ORM } from 'redux-orm';
import { Property } from '../modules/Property/model';
import { User } from '../modules/User/model';

const orm = new ORM();
orm.register(Property, User);


export default orm;
