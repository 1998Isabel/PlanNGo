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
		if (place.photos)
			return (place.photos[0].getUrl() + '');
		else
				return "";
	}

	return (
		<Card className="info-card">
				<CardActionArea>
					<CardMedia
						className="info-media"
						image={showphoto}
						title={place.name}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{place.name}
						</Typography>
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
						<Typography variant="body2" color="textSecondary" component="p">
							{place.types[0]}
						</Typography>
						{opening()}
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions>
			</Card>
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