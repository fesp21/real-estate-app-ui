/**
 * @flow
 */
import React, {PropTypes, Component, PureComponent} from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./actions";
import { SELECTORS } from "./selectors";
import ImagePicker from 'react-native-image-crop-picker';
import List from './Components/Create/List';
import Stage3 from './Components/Create/Stage3';
import Stage4 from './Components/Create/Stage4';
import Stage5 from './Components/Create/Stage5';
import Stage6 from './Components/Create/Stage6';
import Stage7 from './Components/Create/Stage7';
import NavBack from './Components/Create/NavBack';
import map from 'lodash/map';
import Header from './Components/Create/Header';
import Footer from './Components/Create/Footer';
import merge from 'lodash/merge';
import get from "lodash/get";

class PropertyCreate extends Component {


  static route = {
    navigationBar: {
      renderLeft: (route) => {
        const {config: {eventEmitter}} = route;
        return (
          <NavBack emitter={eventEmitter}
                   stage={route.params.stage}
                   icon="ios-arrow-back"
          />
        );
      }
    },
  };

  static propTypes = {
    listings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    stage:1
  };

  constructor() {
    super();
    this.goToNextStage = this.goToNextStage.bind(this);
    this.goToPrevStage = this.goToPrevStage.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.updateListing = this.updateListing.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  pickImage() {
    const {listings} = this.props;
    let images= [];
    ImagePicker.openPicker({
      multiple: true
    }).then(collection => {
      map(collection, (image) => {
        images.push(image.path)
      });
      if(images.length) {
        let payload = {
          ...listings,
          attributes: {
            ...listings.attributes,
            images:images
          },
        };
        this.props.actions.changeListingValue(payload);
      }
    }).catch((e)=>{
    });
  }

  updateListing(path,index,value) {
    const {listings} = this.props;
    const payload = {...listings, [path] : {...listings[path], [index]:value } };
    this.props.actions.changeListingValue(payload);
    this.goToNextStage();
  }

  onFieldChange(key,value) {
    const {listings} = this.props;
    let payload = {
      ...listings,
      attributes: {
        ...listings.attributes,
        [key]: value
      },
    };
    this.props.actions.changeListingValue(payload);
  }

  componentDidUpdate() {
    const {stage} = this.state;
    this.props.navigator.updateCurrentRouteParams({
      stage: stage,
    });
  }

  componentWillMount() {
    this._subscription = this.props.route.getEventEmitter().addListener('goBack', this.goToPrevStage);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  goToPrevStage() {
    this.setState({
      stage:this.state.stage - 1
    });
  };

  goToNextStage() {
    return this.setState({
      stage:this.state.stage + 1
    });
  }

  onIncrement(type) {
    const {listings} = this.props;
    const {filters} = listings;
    const meta = get(listings,'attributes.meta');

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

    let arrayIndex = (filters[type].indexOf(meta[field]) + 1) % filters[type].length;
    let selectedValue = filters[type][arrayIndex];

    let payload = {
      ...listings,
      attributes: {
        ...listings.attributes,
        meta: {...listings.attributes.meta,
          [field]: selectedValue
        },
      },
    };
    this.props.actions.changeListingValue(payload);
  }

  onDecrement(type) {
    const {listings} = this.props;
    const {filters} = listings;
    const meta = get(listings,'attributes.meta');

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

    let arrayIndex = filters[type].indexOf(meta[field]);
    arrayIndex == 0 ? arrayIndex = filters[type].length : arrayIndex;
    let selectedValue = filters[type][arrayIndex - 1];
    this.props.actions.changeFormValue(field,selectedValue);

    let payload = {
      ...listings,
      attributes: {
        ...listings.attributes,
        meta: {...listings.attributes.meta,
          [field]: selectedValue
        },
      },
    };
    this.props.actions.changeListingValue(payload);
  }

  render() {
    const { listings } = this.props;
    const { attributes } = listings;
    const { stage } = this.state;

    return (
      <View style={{flex:1}}>

        {
          stage == 1 &&
          <List
            path="attributes"
            index="type"
            collection={['For Sale','For Rent']}
            header={<Header title="What type of Property you want to list ?" />}
            updateListing={this.updateListing}
          />
        }

        {
          stage == 2 &&
          <List
            path="attributes"
            index="category"
            header={<Header title="Select Category Type" />}
            updateListing={this.updateListing}
            collection={['Apartment','Villa', 'Chalets']}
          />
        }

        {
          stage == 3 &&
          <Stage3
            path="attributes"
            index="address"
            stage={stage}
            header={<Header title="What city is your {category} located in ?" />}
            category='Apartment'
            footer={<Footer updateListing={this.updateListing}/>}
          />
        }

        {
          stage == 4 &&
          <Stage4
            {...listings.attributes.meta}
            {...listings.filters}
            header={<Header title="Just a little bit more about your {category} " />}
            footer={<Footer updateListing={this.goToNextStage}/>}
            onIncrement={this.onIncrement}
            onDecrement={this.onDecrement}
          />
        }

        {
          stage == 5 &&
          <Stage5
            pickImage={this.pickImage}
            images={attributes.images}
            header={<Header title="Choose images of your property" />}
            footer={<Footer updateListing={this.updateListing}/>}
          />
        }

        {
          stage == 6 &&
          <Stage6
            onFieldChange={this.onFieldChange}
            attributes={attributes}
            header={<Header title="You are almost there !!" />}
            footer={<Footer updateListing={this.updateListing}/>}
          />
        }

        {
          stage == 7 &&
          <Stage7
            header={<Header title="Select Amenities" />}
            footer={<Footer updateListing={this.updateListing} title="Save"/>}
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
    listings:SELECTORS.fetchListings(state)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyCreate);