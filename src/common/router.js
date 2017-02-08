import { createRouter } from '@exponent/ex-navigation';
import App from '../app/App';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PropertyList from '../property/PropertyList';
import PropertyFilters from '../property/PropertyFilters';
import PropertyFavorites from '../property/PropertyFavorites';
import PropertyDetail from '../property/PropertyDetail';
import PropertyMap from '../property/PropertyMap';
import PropertyCreate from '../property/PropertyCreate';
import PropertySlideShow from '../property/components/SlideShow';
import SettingList from '../setting/List';
import Profile from '../user/Profile';
import UserDetail from '../user/UserDetail';
import UserEdit from '../user/UserEdit';

const Router = createRouter(() => ({
  app: () => App,
  login: () => Login,
  register: () => Register,
  propertyList: () => PropertyList,
  propertyFilters: () => PropertyFilters,
  propertyFavorites: () => PropertyFavorites,
  propertyDetail: () => PropertyDetail,
  propertyMaps: () => PropertyMap,
  propertyCreate: () => PropertyCreate,
  settingList: () => SettingList,
  profile: () => Profile,
  propertySlideShow: () => PropertySlideShow,
  userDetail: () => UserDetail,
  userEdit: () => UserEdit
}));

export default Router;
