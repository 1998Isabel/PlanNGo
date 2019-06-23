import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
// import Marker from './Marker';
import MarkerInfo from './MarkerInfo'

// examples:
import GoogleMap from './GoogleMap';
import Search from './Search';
import { withApollo } from 'react-apollo';
import { MAP_ITEMS } from '../../graphql/queries';

// consts
const TAIPEI_NTU_CENTER = [25.021918, 121.535285];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }

  componentDidMount() {
    this.props.client.query({query: MAP_ITEMS}).then(result => {
      const queryplaces = result.data.items.map(item => {
        function lat() {return item.place.location[0]};
        function lng() {return item.place.location[1]};
        console.log(item.place.type)
        const place = {
          name: item.place.name,
          geometry: {location: {lat, lng}},
          show: false,
          place_id: item.place.placeid,
          types: [item.place.description],
          price_level: item.place.price,
          spottype: item.place.type,
        }
        // console.log(place.types)
        return place
      })
      // console.log("Query places in map", queryplaces)
      this.setState({places: queryplaces})
      // console.log("query: ",this.state.places)
    })
    
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    place.show = false;
    const places = this.state.places
    places.push(place)
    // console.log(place.geometry.location.lat())
    // console.log(place.geometry.location.lng())
    // console.log(place.place_id)
    this.setState({ places: places });
  };

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = (key) => {
    this.setState((state) => {
      // console.log(state)
      const index = state.places.findIndex(e => e.place_id === key);
      // console.log(index)
      // console.log(index)
      if (index < 0){
        return;}
      state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (
      <div id="right_map">
        {mapApiLoaded && (
            <Search map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
        )}
        <GoogleMap
          defaultZoom={12}
          defaultCenter={TAIPEI_NTU_CENTER}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ['places', 'geometry'],
          }}
          onChildClick={this.onChildClickCallback}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {!isEmpty(places) &&
            places.map(place => (
              <MarkerInfo
                key={place.place_id}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
                show={place.show}
                place={place}
              />
            ))}
        </GoogleMap>
      </div>
    );
  }
}

export default withApollo(Map);