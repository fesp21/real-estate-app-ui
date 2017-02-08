/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { View } from 'react-native';
import NavBack from '../components/NavBack';
import Done from '../components/Done';
import FiltersScene from './components/filters/FilterScene';
import SearchScene from './components/SearchScene';
import colors from './../common/colors';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './common/actions';
import { SELECTORS } from './common/selectors';
import { resolveCountryName } from './../common/functions';

class PropertyFilters extends Component {

  state = {
    searchMode:false,
    navigatedBack:false // @hack to fix navbar issue
  };

  static route = {
    navigationBar: {
      title: 'Filters',
      titleStyle: {
        fontSize:15
      },
      renderBackground: (props) => <View style={{height: 64,backgroundColor:'white',opacity:0.8}}/>,
      tintColor: colors.darkGrey,
      renderLeft: (route, props) => <NavBack text="Close" icon="ios-close" />,
      renderRight: (route) => {
        const { config: { eventEmitter }  } = route;
        return (
          <Done emitter={eventEmitter}
                visible={route.params.visible}
                title="Done"
          />
        );
      },
    },
  };

  componentDidUpdate() {
    const {navigatedBack,searchMode} = this.state;
    if(navigatedBack) return;
    this.props.navigator.updateCurrentRouteParams({
      visible: searchMode,
    });
  }

  componentWillMount() {
    this._subscription = this.props.route.getEventEmitter().addListener('reset', this.handleReset);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  handleReset = () => {
    this.setState({
      searchMode:false
    });
  };

  onCategorySelect = (value) => {
    this.props.actions.changeFormValue('category',value);
  };

  onPriceFromSelect = (value) => {
    this.props.actions.changeFormValue('priceFrom',value);
  };

  onPriceToSelect = (value) => {
    this.props.actions.changeFormValue('priceTo',value);
  };

  onSortSelect = (value) => {
    this.props.actions.changeFormValue('sortBy',value);
  };

  onSearch = (value) => {
    this.props.actions.changeFormValue('searchString',value);
  };

  showSearch = () => {
    return this.setState({
      searchMode:true
    });
  };

  setSearchMode = (value :boolean) => {
    return this.setState({
      searchMode:value
    });
  };

  onIncrementDecrement = (action, type) => {
    let arrayIndex,selectedValue;

    const {filters} = this.props;
    let field;
    switch (type) {
      case 'bedroomsArr' :
        field = 'bedroom';
        break;
      case 'bathroomsArr' :
        field = 'bathroom';
        break;
      case 'parkingArr' :
        field = 'parking';
        break;
      default :
        break;
    }

    switch (action) {
      case 'decrement':
        arrayIndex = filters[type].indexOf(filters[field]);
        arrayIndex == 0 ? arrayIndex = filters[type].length : arrayIndex;
        selectedValue = filters[type][arrayIndex - 1];
        break;
      case 'increment':
        arrayIndex = (filters[type].indexOf(filters[field]) + 1) % filters[type].length;
        selectedValue = filters[type][arrayIndex];
        break;
    }

    this.props.actions.changeFormValue(field,selectedValue);
  };

  search = () => {
    this.setState({navigatedBack:true});
    this.props.actions.invalidateProperty();
    this.props.actions.fetchProperties();
    return this.props.navigator.pop();
  };

  render() {
    const { categories,filters,country } = this.props;
    const { searchMode } = this.state;
    return (
      <View style={{flex:1}}>
        {
          searchMode ?
            <SearchScene
              searchString={this.props.filters.searchString}
              onSearch={this.onSearch}
              country={country}
            />
            :
            <FiltersScene
              {...filters}
              onSearch={this.onSearch}
              onPriceFromSelect={this.onPriceFromSelect}
              onPriceToSelect={this.onPriceToSelect}
              onIncrementDecrement={this.onIncrementDecrement}
              onSearchPress={this.search}
              onCategorySelect={this.onCategorySelect}
              onSortSelect={this.onSortSelect}
              showSearch={this.showSearch}
              categories={categories}
            />
        }
      </View>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) }
}

function mapStateToProps(state) {
  return {
    properties:SELECTORS.fetchProperties(state),
    categories:SELECTORS.getCategoriesWithAny(state),
    filters:SELECTORS.getFilters(state),
    country:resolveCountryName(state.appReducer.country)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyFilters);