import { createRouter } from '@exponent/ex-navigation';
import App from './../App';
import Login from '../modules/Auth/Login';
import Register from '../modules/Auth/Register';
import PropertyList from '../modules/Property/List';
import PropertyFilters from '../modules/Property/Filters';
import PropertyFavorites from '../modules/Property/Favorites';
import PropertyDetail from '../modules/Property/Detail';
import PropertyMap from '../modules/Property/Map';
import PropertyCreate from '../modules/Property/Create';
import PropertySlideShow from '../modules/Property/Components/SlideShow';
import SettingList from '../modules/Setting/List';
import UserDetail from './../modules/User/Detail';

const Router = createRouter(({
  app: App,
  login: Login,
  register: Register,
  propertyList: PropertyList,
  propertyFilters: PropertyFilters,
  propertyFavorites: PropertyFavorites,
  propertyDetail: PropertyDetail,
  propertyMaps: PropertyMap,
  propertyCreate: PropertyCreate,
  settingList: SettingList,
  userDetail: UserDetail,
  propertySlideShow: PropertySlideShow,
}));

export default Router;
