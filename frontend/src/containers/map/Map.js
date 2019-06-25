import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
// import Marker from './Marker';
import MarkerInfo from './MarkerInfo'

// examples:
import GoogleMap from './GoogleMap';
import Search from './Search';
import { withApollo } from 'react-apollo';
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

  componentDidMount() {
    this.props.client.query({ query: MAP_ITEMS, variables: {userID: this.props.user}}).then(result => {
      const queryplaces = result.data.items.map(item => {
        function lat() { return item.place.location[0] };
        function lng() { return item.place.location[1] };
        console.log(item.place.type)
        const place = {
          id: item.id,
          name: item.place.name,
          geometry: { location: { lat, lng } },
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
      this.setState({ places: queryplaces })
      // console.log("query: ",this.state.places)
    })
    this.props.client.subscribe({
      query: MAPITEM_SUBSCRIPTION,
      variables: { userid: this.props.user },
    }).subscribe(response => {
      let subplace = response.data.mapitem.data;
      if (response.data.mapitem.mutation === "CREATED") {
        function lat() { return subplace.place.location[0] };
        function lng() { return subplace.place.location[1] };
        const place = {
          id: subplace.id,
          name: subplace.place.name,
          geometry: { location: { lat, lng } },
          show: true,
          place_id: subplace.place.placeid,
          types: [subplace.place.description],
          price_level: subplace.place.price,
          spottype: subplace.place.type,
        }
        this.addPlaceFromQuery(place);
      }
      else {
        const { places } = this.state;
          const delindex = places.findIndex(ele => ele.id === subplace.id)
          places.splice(delindex, 1);
          this.setState({places: places});
      }
    })
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlaceFromQuery = (place) => {
    const places = this.state.places
    let findplace = places.findIndex(ele => {
      return (ele.place_id === place.place_id) && (ele.fromSearch)
    })
    if (findplace === -1) {
      place.show = true
      places.push(place)
    }
    else {
      console.log("Remove from search: ", findplace)
      const remove = places.splice(findplace,1);
      place.show = false;
      console.log(place)
      places.push(place);
    }
    this.setState({ places: places });
  };

  // addPlace for Search
  addPlace = (place) => {
    const places = this.state.places
    let findplace = places.findIndex(ele => {
      return ele.place_id === place.place_id
    })
    if (findplace === -1) {
      place.show = true
      place.fromSearch = true
      places.push(place)
    }
    else {
      console.log("find exist: ", findplace)
      places[findplace].show = true
    }
    this.setState({ places: places });
  };

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = (key) => {
    this.setState((state) => {
      // console.log(state)
      const index = state.places.findIndex(e => e.id === key);
      // console.log(index)
      // console.log(index)
      if (index < 0) {
        return;
      }
      state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    console.log(places)
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
                key={place.id}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
                show={place.show}
                place={place}
                user={this.props.user}
              />
            ))}
        </GoogleMap>
      </div>
    );
  }
}

export default withApollo(Map);