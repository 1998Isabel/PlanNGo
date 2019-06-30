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
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then(response => response.json())
      .then((data) => {
        data.results.forEach((result) => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        this.setState({ places: data.results });
      });
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = (key) => {
    this.setState((state) => {
      const index = state.places.findIndex(e => e.id === key);
      state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  render() {
    const { places } = this.state;

    return (
      <Fragment>
        {!isEmpty(places) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={TAIPEI_NTU_CENTER}
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            onChildClick={this.onChildClickCallback}
          >
            {places.map(place =>
              (<Marker
                key={place.id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                show={place.show}
                place={place}
              />))}
          </GoogleMap>
        )}
      </Fragment>
    );
  }
}

export default Map;
