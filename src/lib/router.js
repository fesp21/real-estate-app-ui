import { createRouter } from '@exponent/ex-navigation';
import App from '../App';
import Login from '../modules/Auth/Login';
import Register from '../modules/Auth/Register';
import PropertyList from '../modules/Property/List';
import PropertyFilters from '../modules/Property/Filters';
import PropertyFavorites from '../modules/Property/Favorites';
import PropertyDetail from '../modules/Property/Detail';
import PropertyMap from '../modules/Property/Map';
import propertyCreateStack from '../modules/Property/CreateStack';
import PropertyCreate from '../modules/Property/Create';
import SettingList from '../modules/Setting/List';

const Router = createRouter(() => ({
  app:() => App,
  login: () => Login,
  register: () => Register,
  propertyList: () => PropertyList,
  propertyFilters: () => PropertyFilters,
  propertyFavorites: () => PropertyFavorites,
  propertyDetail: () => PropertyDetail,
  propertyMaps: () => PropertyMap,
  propertyCreateStack: () => propertyCreateStack,
  propertyCreate: () => PropertyCreate,
  settingList: () => SettingList,
}));

export default Router;