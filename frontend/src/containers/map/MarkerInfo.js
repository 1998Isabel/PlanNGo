import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// InfoWindow component
const InfoWindow = (props) => {
	const { place } = props;
	console.log(place)
	const infoWindowStyle = {
		position: 'relative',
		bottom: 150,
		left: '-45px',
		width: 220,
		backgroundColor: 'white',
		boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
		padding: 10,
		fontSize: 14,
		zIndex: 100,
	};
	const opening = () => {
		if (place.opening_hours)
			return(
				<div style={{ fontSize: 14, color: 'green' }}>
					{place.opening_hours.open_now ? 'Open' : 'Closed'}
				</div>);
		else{
			//console.log(place.opening_hours)
			return;
		}
	}

	const showphoto = () => {
		//console.log(place.photos[0].getUrl())
		return(
			<img src={place.photos[0].getUrl()} />
		)
	}

	return (
		<div style={infoWindowStyle}>
			<div style={{ fontSize: 16 }}>
				{place.name}
			</div>
			<div style={{ fontSize: 14 }}>
				<span style={{ color: 'grey' }}>
					{place.rating}{' '}
				</span>
				<span style={{ color: 'orange' }}>
					{String.fromCharCode(9733).repeat(Math.floor(place.rating))}
				</span>
				<span style={{ color: 'lightgrey' }}>
					{String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
				</span>
			</div>
			{showphoto()}
			<div style={{ fontSize: 14, color: 'grey' }}>
				{place.types[0]}
			</div>
			<div style={{ fontSize: 14, color: 'grey' }}>
				{'$'.repeat(place.price_level)}
			</div>
			{opening()}
		</div>
	);
};

// Marker component
const Marker = (props) => {
	const markerStyle = {
		border: '1px solid white',
		borderRadius: '50%',
		height: 10,
		width: 10,
		backgroundColor: props.show ? 'red' : 'blue',
		cursor: 'pointer',
		zIndex: 10,
	};

	return (
		<Fragment>
			<div style={markerStyle} />
			{props.show && <InfoWindow place={props.place} />}
		</Fragment>
	);
};

InfoWindow.propTypes = {
	place: PropTypes.shape({
		name: PropTypes.string,
		formatted_address: PropTypes.string,
		rating: PropTypes.number,
		types: PropTypes.array,
		price_level: PropTypes.number,
		opening_hours: PropTypes.object,
	}).isRequired,
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