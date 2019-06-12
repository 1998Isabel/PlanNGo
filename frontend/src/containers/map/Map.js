import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import './../../App.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [25.021918, 121.535285],
      zoom: 9
    }
  }
  render() {
    return (
      <div id="right_map">
        <GoogleMap center={this.state.center} zoom={this.state.zoom}>

        </GoogleMap>
      </div>
    );
  }
}

export default Map;