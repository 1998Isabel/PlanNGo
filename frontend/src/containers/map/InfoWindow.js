import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Map.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const InfoWindow = (props) => {
	const { place } = props;
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
		// borderRadius: '10px',
	};

	const opening = () => {
		if (place.opening_hours)
			return (
				<div style={{ fontSize: 14, color: 'green' }}>
					{place.opening_hours.open_now ? 'Open' : 'Closed'}
				</div>);
		else {
			//console.log(place.opening_hours)
			return;
		}
	}

	const showphoto = () => {
		//console.log(place.photos[0].getUrl())
		if (place.photos)
			return (
				<img src={place.photos[0].getUrl()} width="220px"/>
			);
		else
			return;
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
			<CardActions>
				<Button size="small" color="primary">
					Share
					</Button>
				<Button size="small" color="primary">
					Learn More
					</Button>
			</CardActions>
		</div>
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

export default InfoWindow;