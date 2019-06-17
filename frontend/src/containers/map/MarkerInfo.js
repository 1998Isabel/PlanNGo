import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import InfoWindow from './InfoWindow'
import PlaceIcon from '@material-ui/icons/Place';
//import InfoWindow from './InfoWindow_card'

// Marker component
const Marker = (props) => {
	return (
		<Fragment>
			<PlaceIcon color="secondary" style={{fontSize: "36px"}} />
			{props.show && <InfoWindow place={props.place} />}
		</Fragment>
	);
};

Marker.propTypes = {
	show: PropTypes.bool.isRequired,
	place: PropTypes.shape({
		name: PropTypes.string,
		formatted_address: PropTypes.string,
		rating: PropTypes.number,
		types: PropTypes.array,
		price_level: PropTypes.number,
		opening_hours: PropTypes.object,
	}).isRequired,
};

export default Marker;