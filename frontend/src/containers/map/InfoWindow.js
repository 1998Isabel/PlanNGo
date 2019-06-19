import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Map.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';

const InfoWindow = (props) => {
	const { place } = props;
	const [addtype, setAddtype] = React.useState(null);

	const infoWindowStyle = {
		position: 'relative',
		bottom: 220,
		left: '-45px',
		width: 260,
		// height: "40vh",
		backgroundColor: 'white',
		boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
		padding: 14,
		fontSize: 14,
		zIndex: 100,
		borderRadius: '10px',
	};

	// function handleclick(type) {
	// 	// if (addtype !== type)
	// 	// 	//setAddtype(type);
	// 		console.log(type)
	// }
	
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
				<div>
					<img className="image-img" height="30vh" minWidth="32vh" src={place.photos[0].getUrl()}/>
				</div>
			);
		else
			return;
	}

	const buttoncolor = (type) => {
		if (addtype === type)
			return "secondary"
		else
			return ""
	}

	return (
		<div style={infoWindowStyle}>
			<div style={{ fontSize: 16 }}>
				{place.name}
				<IconButton className="info-button-del" aria-label="Delete">
        	<DeleteOutlinedIcon />
      	</IconButton>
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
			{/* {showphoto()} */}
			<div style={{ fontSize: 14, color: 'grey' }}>
				{place.types[0]}
			</div>
			<div style={{ fontSize: 14, color: 'grey' }}>
				{'$'.repeat(place.price_level)}
			</div>
			{opening()}
			<CardActions>
				<Button size="small" style={{ fontSize: 14 }}>
					More
				</Button>
				<IconButton className="info-button" aria-label="Add to eat" 
					color={buttoncolor('eat')}
					onClick={() => {
						// console.log('eat')
						setAddtype('eat')
				}}>
					<RestaurantIcon />
				</IconButton>
				<IconButton className="info-button" aria-label="Add to favorate"
					color={buttoncolor('favorate')}
					onClick={() => {
						// console.log('favorate')
						setAddtype('favorate')
				}}>
					<FavoriteIcon />
				</IconButton>
				<IconButton className="info-button" aria-label="Add to accommodation"
					color={buttoncolor('accommodation')}
					onClick={() => {
						// console.log('accommodation')
						setAddtype('accommodation')
				}}>
					<LocateIcon />
				</IconButton>
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