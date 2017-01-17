/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { SELECTORS } from './selectors';
import NavBack from './../../common/NavBack';
import Done from './../../common/Done';
import FiltersScene from './Components/Filters/FilterScene';
import SearchScene from './Components/SearchScene';
import Colors from './../../common/Colors';

class PropertyFilters extends Component {

  state = {
    searchMode:false,
    navigatedBack:false // @hack to fix navbar issue
  };

  constructor() {
    super();
    this.onPriceFromSelect = this.onPriceFromSelect.bind(this);
    this.onPriceToSelect = this.onPriceToSelect.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.search = this.search.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.setSearchMode = this.setSearchMode.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Filters',
      titleStyle: {
        fontSize:15
      },
      tintColor: Colors.darkGrey,
      renderLeft: (route, props) => <NavBack text="Close" icon="ios-close" style={{ fontSize:13 }} />,
      renderRight: (route) => {
        const { config: { eventEmitter }  } = route;
        return (
          <Done emitter={eventEmitter}
                visible={route.params.visible}
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

  handleReset() {
    this.setState({
      searchMode:false
    });
  };

  onCategorySelect(value) {
    this.props.actions.changeFormValue('category',value);
  }

  onPriceFromSelect(value) {
    this.props.actions.changeFormValue('priceFrom',value);
  }
  onPriceToSelect(value) {
    this.props.actions.changeFormValue('priceTo',value);
  }

  onSortSelect(value) {
    this.props.actions.changeFormValue('sortBy',value);
  }

  onSearch(value) {
    this.props.actions.changeFormValue('searchString',value);
  }

  showSearch() {
    return this.setState({
      searchMode:true
    })
  }

  setSearchMode(bool:boolean) {
    return this.setState({
      searchMode:bool
    })
  }

  onIncrement(type) {
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
    let arrayIndex = (filters[type].indexOf(filters[field]) + 1) % filters[type].length;
    let selectedValue = filters[type][arrayIndex];
    this.props.actions.changeFormValue(field,selectedValue);
  }

  onDecrement(type) {
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
    let arrayIndex = filters[type].indexOf(filters[field]);
    arrayIndex == 0 ? arrayIndex = filters[type].length : arrayIndex;
    let selectedValue = filters[type][arrayIndex - 1];
    this.props.actions.changeFormValue(field,selectedValue);
  }

  search() {
    this.setState({navigatedBack:true});
    this.props.actions.searchRequested();
    this.props.actions.fetchProperties();
    return this.props.navigator.pop();
  }

  render() {
    const { categories,filters } = this.props;
    const { searchMode } = this.state;
    return (
      <View style={{flex:1}}>
        {
          searchMode ?
            <SearchScene
              searchString={this.props.filters.searchString}
              onSearch={this.onSearch}
            />
            :
            <FiltersScene
              {...filters}
              onSearch={this.onSearch}
              onPriceFromSelect={this.onPriceFromSelect}
              onPriceToSelect={this.onPriceToSelect}
              onIncrement={this.onIncrement}
              onDecrement={this.onDecrement}
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
    categories:SELECTORS.fetchCategories(state),
    filters:SELECTORS.getFilters(state)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyFilters);