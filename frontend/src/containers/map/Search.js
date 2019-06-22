import React, { Component } from 'react';
import './Map.css'
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

class Search extends Component {
	constructor(props) {
		super(props);
		this.clearSearchBox = this.clearSearchBox.bind(this);
	}

	componentDidMount({ map, mapApi } = this.props) {
		const options = {
			// restrict your search to a specific type of result
			// types: ['geocode', 'address', 'establishment', '(regions)', '(cities)'],
			// restrict your search to a specific country, or an array of countries
			// componentRestrictions: { country: ['gb', 'us'] },
		};
		this.autoComplete = new mapApi.places.Autocomplete(
			this.searchInput,
			options,
		);
		this.autoComplete.addListener('place_changed', this.onPlaceChanged);
		this.autoComplete.bindTo('bounds', map);
	}

	componentWillUnmount({ mapApi } = this.props) {
		mapApi.event.clearInstanceListeners(this.searchInput);
	}

	onPlaceChanged = ({ map, addplace } = this.props) => {
		const place = this.autoComplete.getPlace();

		if (!place.geometry) return;
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}

		addplace(place);
		this.searchInput.blur();
	};

	clearSearchBox() {
		this.searchInput.value = '';
	}

	render() {
		return (
			<Paper className="search-root">
				<IconButton className="search-iconButton" aria-label="Menu">
					<MenuIcon />
				</IconButton>
				<InputBase
					inputRef={(ref) => {
						this.searchInput = ref;
					}}
					type="text"
					onFocus={this.clearSearchBox}
					className="search-input"
					placeholder="Search Google Maps"
					inputProps={{ 'aria-label': 'Search Google Maps' }}
				/>
				<IconButton className="search-iconButton" aria-label="Search">
					<SearchIcon />
				</IconButton>
			</Paper>
		);
	}
}

export default Search;