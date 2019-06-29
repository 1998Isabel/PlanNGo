import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';
import socketIOClient from "socket.io-client";

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
      center: TAIPEI_NTU_CENTER,
    };
  }

  componentDidMount() {
    this.props.client.query({fetchPolicy:'network-only', query: MAP_ITEMS, variables: {userID: this.props.user}}).then(result => {
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
        const { places, markers } = this.state;
          const delindex = places.findIndex(ele => ele.id === subplace.id)
          places.splice(delindex, 1);
          markers.splice(delindex, 1)
          this.setState({
            places: places,
            markers: markers,
          });
      }
    })

    this.props.socket.on("placeclick", (data) => {
      console.log("Card_Click", data)
      const places = this.state.places
      const index = places.findIndex(ele => {
        return ele.id === data
      })
      places[index].show = true
      this.setState({places: places})
      this.state.mapInstance.setCenter(new this.state.mapApi.LatLng(places[index].geometry.location.lat(),places[index].geometry.location.lng()));
      this.state.mapInstance.setZoom(15);
    })

    this.props.socket.on("routeMap", (data) => {
      console.log(data)
      let map = this.state.mapInstance;
	    let maps = this.state.mapApi;
	    console.log(this.state.places[0].geometry.location)
	    let directionsService = new maps.DirectionsService();
	    let directionsDisplay = new maps.DirectionsRenderer();
	    directionsDisplay.setMap(map)
	    const waypts = [{location: "Taipei Main Station", stopover: true}]
	    directionsService.route(
	      {
	        origin: {lat: this.state.places[2].geometry.location.lat(), lng: this.state.places[2].geometry.location.lng()},
	        destination: {lat: this.state.places[3].geometry.location.lat(), lng: this.state.places[3].geometry.location.lng()},
	        waypoints: waypts,
	        travelMode: maps.TravelMode.DRIVING
	      },
	      function(response, status) {
	        console.log(response)
	        if (status === 'OK') {
	          directionsDisplay.setDirections(response);
	        } else {
	          window.alert('Directions request failed due to ' + status);
	        }
	      }
	    )
    })
  }

  apiHasLoaded = (map, maps, places) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    const markers = [];
    console.log("MAP", places)
		places.forEach((place) => {
      markers.push(new maps.Marker({
        map: map,
				position: {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				},
			}));
		});
	
		markers.forEach((marker, i) => {
			marker.addListener('click', () => {
        console.log("Click", i)
				this.setState((state) => {
          // console.log(state)
          const index = state.places.findIndex(e => e.id === i);
          // console.log(index)
          // console.log(index)
          if (index < 0) {
            return;
          }
          map.setCenter(new maps.LatLng(state.places[index].geometry.location.lat(),state.places[index].geometry.location.lng()));
          map.setZoom(15);
          state.places[i].show = !state.places[i].show; // eslint-disable-line no-param-reassign
          return { places: state.places };
        });
      });
    });
    this.setState({markers: markers})
  };

  addPlaceFromQuery = (place) => {
    const { places, markers } = this.state
    let findplace = places.findIndex(ele => {
      return (ele.place_id === place.place_id) && (ele.fromSearch)
    })
    if (findplace === -1) {
      place.show = true
      places.push(place)
    }
    else {
      console.log("Remove from search: ", findplace)
      places.splice(findplace,1);
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
      let newmarker = new this.state.mapApi.Marker({
        map: this.state.mapInstance,
				position: {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				},
      })
      newmarker.addListener('click', () => {
				this.setState((state) => {
          console.log("Click", state.places.length - 1)
          map.setCenter(new maps.LatLng(state.places[index].geometry.location.lat(),state.places[index].geometry.location.lng()));
          map.setZoom(15);
          state.places[state.places.length - 1].show = !state.places[state.places.length - 1].show; // eslint-disable-line no-param-reassign
          return { places: state.places };
        });
      });
      markers.push(newmarker)
    }
    else {
      console.log("find exist: ", findplace)
      places[findplace].show = true
    }
    this.setState({ 
      places: places,
      markers: markers
    });
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
      this.state.mapInstance.setCenter(new this.state.mapApi.LatLng(state.places[index].geometry.location.lat(),state.places[index].geometry.location.lng()));
      this.state.mapInstance.setZoom(15);
      state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  showMarker = (places) => {
    const markers = [];
    console.log("MAP", places)
		places.forEach((place) => {
      markers.push(new this.state.mapApi.Marker({
        map: this.state.mapInstance,
				position: {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				},
			}));
		});
	
		markers.forEach((marker, i) => {
			marker.addListener('click', () => {
        console.log("Click", i)
				this.setState((state) => {
          // console.log(state)
          const index = state.places.findIndex(e => e.id === i);
          // console.log(index)
          // console.log(index)
          if (index < 0) {
            return;
          }
          this.state.mapInstance.setCenter(new this.state.mapApi.LatLng(state.places[index].geometry.location.lat(),state.places[index].geometry.location.lng()));
          this.state.mapInstance.setZoom(15);
          state.places[i].show = !state.places[i].show; // eslint-disable-line no-param-reassign
          return { places: state.places };
        });
			});
		});
  }

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    // this.showMarker(places, mapInstance, mapApi)
    return (
      <div id="right_map">
        {mapApiLoaded && (
          <Search map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
        )}
        <GoogleMap
          defaultZoom={12}
          defaultCenter={this.state.center}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ['places', 'geometry'],
          }}
          // onChildClick={this.onChildClickCallback}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps, places)}
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