import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import './../../App.css';

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apikey: "",
      center: [25.021918, 121.535285],
      zoom: 12
    }
  }
  render() {
    return (
      <div id="right_map">
        <GoogleMap
          // bootstrapURLKeys={{ key: this.state.apikey}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          options={createMapOptions}
        >
        </GoogleMap>
      </div>
    );
  }
}

export default Map;