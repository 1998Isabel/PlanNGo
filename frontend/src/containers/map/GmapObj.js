import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMap from './GoogleMap';
import Search from './SearchObj';

// consts: [34.0522, -118.2437]
const TAIPEI_NTU_CENTER = [25.021918, 121.535285];

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div>
    </div>`;

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api

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

  // componentDidMount() {
  //   fetch('places.json')
  //     .then(response => response.json())
  //     .then((data) => {
  //       data.results.forEach((result) => {
  //         result.show = false; // eslint-disable-line no-param-reassign
  //       });
  //       this.setState({ places: data.results });
  //     });
	// }
	handleApiLoaded = (map, maps, places) => {
		this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
		const markers = [];
		const infowindows = [];
	
		places.forEach((place) => {
			markers.push(new maps.Marker({
				position: {
					lat: place.geometry.location.lat,
					lng: place.geometry.location.lng,
				},
				map,
			}));
	
			infowindows.push(new maps.InfoWindow({
				content: getInfoWindowString(place),
			}));
		});
	
		markers.forEach((marker, i) => {
			marker.addListener('click', () => {
				infowindows[i].open(map, marker);
			});
		});
	};

	addPlace = (place) => {
    const places = this.state.places
    places.push(place)
    // console.log(places)
    this.setState({ places: places });
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
					defaultZoom={10}
					defaultCenter={TAIPEI_NTU_CENTER}
					bootstrapURLKeys={{
						key: process.env.REACT_APP_MAP_KEY,
						libraries: ['places', 'geometry'],
					}}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps, places)}
				/>
      </div>
    );
  }
}

export default Map;
