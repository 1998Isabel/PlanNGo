import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
import Marker from './Marker';
import MarkerInfo from './MarkerInfo'

// examples:
import GoogleMap from './GoogleMap';
import AutoComplete from './Search';

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
    this.setState({ places: [place] });
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (
      <div id="right_map">
        {mapApiLoaded && (
            <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
        )}
        <GoogleMap
          defaultZoom={12}
          defaultCenter={TAIPEI_NTU_CENTER}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {!isEmpty(places) &&
            places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />
            ))}
        </GoogleMap>
      </div>
    );
  }
}

export default Map;
