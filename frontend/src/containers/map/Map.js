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
import { MAP_ITEMS, MAPITEM_SUBSCRIPTION, ROUTE_ITEMS } from '../../graphql';

// consts
const TAIPEI_NTU_CENTER = [25.021918, 121.535285];

var markers = [];
var dir_markers = [];
var dir_infowindows = [];
var directions = [];

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
    this.props.client.query({ fetchPolicy: 'network-only', query: MAP_ITEMS, variables: { userID: this.props.user } }).then(result => {
      this.resetDirection()
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
        this.resetDirection()
        const { places } = this.state;
        const delindex = places.findIndex(ele => ele.id === subplace.id)
        places.splice(delindex, 1);
        this.setState({ places: places });
      }
    })

    this.props.socket.on("placeclick", (data) => {
      console.log("Card_Click", data)
      const places = this.state.places
      const index = places.findIndex(ele => {
        return ele.id === data
      })
      places[index].show = true
      this.setState({ places: places })
      this.state.mapInstance.setCenter(new this.state.mapApi.LatLng(places[index].geometry.location.lat(), places[index].geometry.location.lng()));
      this.state.mapInstance.setZoom(15);
      // this.setState({center: places[index].geometry.location})
    })

    this.props.socket.on("routeMap", (data) => {
      console.log("DAY id", data)
      let map = this.state.mapInstance;
      let maps = this.state.mapApi;
      let places = this.state.places;

      this.props.client.query({ fetchPolicy: 'network-only', query: ROUTE_ITEMS, variables: { userID: this.props.user, dayID: data } }).then(result => {
        console.log("ROUTE ITEMS", result)
        const day = result.data.days
        console.log("ROUTE DAY", day.id)
        const dayroute = []
        day.itemsid.forEach((itemid, j) => {
          dayroute.push(places.find(ele => (ele.id === itemid)))
        })
        if (dayroute.length > 1) {
          let details = []
          for (let i = 1; i < dayroute.length; i++) {
            console.log("ROUTE", i)
            let directionsService = new maps.DirectionsService();
            let directionsDisplay = new maps.DirectionsRenderer({
              suppressMarkers: true
            });
            directions.push(directionsDisplay)
            directionsDisplay.setMap(map)
            const origin = {
              lat: dayroute[i - 1].geometry.location.lat(),
              lng: dayroute[i - 1].geometry.location.lng(),
            };
            const destination = {
              lat: dayroute[i].geometry.location.lat(),
              lng: dayroute[i].geometry.location.lng(),
            };
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: 'TRANSIT'
              },
              (response, status) => {
                console.log(response.routes)
                if (status === 'OK') {
                  console.log(status)
                  const detail = {
                    id: day.itemsid[i-1],
                    distance: response.routes[0].legs[0].distance.text,
                    duration: response.routes[0].legs[0].duration.text,
                  }
                  details.push(detail)
                  if (i === dayroute.length-1 ){
                    console.log("DETAILS INSIDE", details)
                    this.sendDirectInfo({
                      id: day.id,
                      details: details
                    })
                  }
                  const steps = response.routes[0].legs[0].steps;
                  const len = dir_markers.length;
                  steps.forEach((e, i) => {
                    const idx = i + len

                    // 加入地圖標記
                    dir_markers.push(new maps.Marker({
                      position: { lat: e.start_location.lat(), lng: e.start_location.lng() },
                      map: map,
                      label: { text: idx + '', color: "#fff" }
                    }));
                    // 加入資訊視窗
                    dir_infowindows.push(new maps.InfoWindow({
                      content: e.instructions
                    }));
                    // console.log(dir_markers.length, dir_infowindows.length, idx);
                    // 加入地圖標記點擊事件
                    dir_markers[idx].addListener('click', function () {
                      if (dir_infowindows[idx].anchor) {
                        dir_infowindows[idx].close();
                      } else {
                        dir_infowindows[idx].open(map, dir_markers[idx]);
                      }
                    });
                  });
                  // console.log("Steps", steps);
                  directionsDisplay.setDirections(response);
                }
                else {
                  window.alert('Directions request failed due to ' + status);
                }
              }
            )
            // .then(() => {
            //   if (i === dayroute.length-1 )
            //     console.log("DETAILS INSIDE", details)
            //     this.sendDirectInfo(details)
            // })
          }
          // console.log("DETAILS INSIDE", details)
          // this.sendDirectInfo(details)
        }
      })
    })
    this.props.socket.on("resetDirect", (data) => {
      console.log("Reset Route", data)
      this.resetDirection()
      this.sendDirectInfo(null)
    })
  }

  apiHasLoaded = (map, maps, places) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
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
      places.splice(findplace, 1);
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
      this.state.mapInstance.setCenter(new this.state.mapApi.LatLng(state.places[index].geometry.location.lat(), state.places[index].geometry.location.lng()));
      this.state.mapInstance.setZoom(15);
      state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
      return { places: state.places };
    });
  };

  sendDirectInfo = (details) => {
    console.log("EMIT DETAILS", details)
    this.props.socket.emit("setRouteDetail", details)
  }

  showMarker = (places) => {
    const { mapInstance, mapApi } = this.state
    if (!(mapApi && mapInstance)) return
    // clear marker
    markers.forEach(mark => {
      mark.setMap(null);
    })
    markers = [];
    console.log("MAP", places)
    places.forEach((place) => {
      markers.push(new mapApi.Marker({
        map: mapInstance,
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
          console.log("In Click", state.places)

          state.mapInstance.setCenter(new mapApi.LatLng(state.places[i].geometry.location.lat(), state.places[i].geometry.location.lng()));
          state.mapInstance.setZoom(15);
          state.places[i].show = !state.places[i].show; // eslint-disable-line no-param-reassign
          return { places: state.places };
        });
      });
    });
  }

  resetDirection = () => {
    directions.forEach(dir => {
      dir.setMap(null)
    })
    directions = []
    dir_markers.forEach(dir => {
      dir.setMap(null)
    })
    dir_markers = [];
    dir_infowindows.forEach(dir => {
      dir.setMap(null);
    })
    dir_infowindows = []
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
          {this.showMarker(places)}
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