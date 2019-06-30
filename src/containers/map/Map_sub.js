import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
// import Marker from './Marker';
import MarkerInfo from './MarkerInfo'

// examples:
import GoogleMap from './GoogleMap';
import Search from './Search';
import { withApollo } from 'react-apollo';
import { Query } from 'react-apollo'
import { MAP_ITEMS, MAPITEM_SUBSCRIPTION } from '../../graphql';

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

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    const places = this.state.places
    let findplace = places.findIndex(ele => {
      return ele.place_id === place.place_id
    })
    if (findplace === -1){
      place.show = true
      places.push(place)
    }
    else {
      console.log("find exist: ",findplace)
      places[findplace].show = true
    }
    this.setState({ places: places });
  };

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = (key) => {
    this.setState((state) => {
      // console.log(state)
      const index = state.places.findIndex(e => e.place_id === key);
      // console.log(index)
      // console.log(index)
      if (index < 0) {
        return;
      }
      state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  handelQuery = (newplaces) => {
    const places = this.state.places
    newplaces.forEach(ele => {
      //this.addPlace(ele)
    });
  }

  unsubscribe = null

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
          {/* <Query query={MAP_ITEMS}>{
            ({ loading, error, data, subscribeToMore }) => {
              if (loading || error)
                return <></>;
              const queryplaces = data.items.map(item => {
                function lat() { return item.place.location[0] };
                function lng() { return item.place.location[1] };
                //console.log(item.place.type)
                const place = {
                  name: item.place.name,
                  geometry: { location: { lat, lng } },
                  show: false,
                  place_id: item.place.placeid,
                  types: [item.place.description],
                  price_level: item.place.price,
                  spottype: item.place.type,
                }
                return place
              })

              if (!this.unsubscribe)
                this.unsubscribe = subscribeToMore({
                  document: MAPITEM_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    const newItem = subscriptionData.data.data
                    return {
                      ...prev,
                      items: [newItem, ...prev.items]
                    }
                  }
                })
              this.handelQuery(queryplaces);
              return <></>
            }
          }</Query> */}
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

export default Map;