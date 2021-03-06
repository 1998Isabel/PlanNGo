import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4'
import { Mutation } from 'react-apollo'
import { CREATE_ITEM } from '../../graphql';
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
import StarIcon from '@material-ui/icons/Star';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';
import Tooltip from '@material-ui/core/Tooltip';

const infoWindowStyle = {
	position: 'relative',
	bottom: 180,
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

class InfoWindow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addtype: this.props.place.spottype,
		};
	}

	// function handleclick(type) {
	// 	// if (addtype !== type)
	// 	// 	//setAddtype(type);
	// 		console.log(type)
	// }

	opening = () => {
		if (this.props.place.opening_hours)
			return (
				<div style={{ fontSize: 14, color: 'green' }}>
					{this.props.place.opening_hours.open_now ? 'Open' : 'Closed'}
				</div>);
		else {
			//console.log(place.opening_hours)
			return;
		}
	}

	showphoto = () => {
		//console.log(place.photos[0].getUrl())
		if (this.props.place.photos)
			return this.props.place.photos[0].getUrl();
		else
			return "";
	}

	buttoncolor = (type) => {
		if (this.state.addtype === type)
			return "secondary"
		else
			return ""
	}

	handleAdd = (type) => {
		// this.setState({addtype: type})
		let typeid = "";
		if (type === "droppable-1")
			typeid = "eat";
		if (type === "droppable-2")
			typeid = "star";
		if (type === "droppable-3")
			typeid = "live";
		const { place } = this.props;
		this.mycreateItem({
			variables: {
				userid : this.props.user,
				id: type,
				itemid: uuidv4(),
				description: (place.types[0])? place.types[0]: "",
				placeid: (place.place_id)? place.place_id: "",
				name: place.name,
				type: typeid,
				photo: this.showphoto(),
				price: (place.price_level)? place.price_level*250: 0,
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
				duration: 0,
			}
		})
	}

	render() {
		return (
			<Mutation mutation={CREATE_ITEM}>
				{createItem => {
					// console.log("createItem")
					this.mycreateItem = createItem

					return (
						<div style={infoWindowStyle}>
							<div style={{ fontSize: 16 }}>
								{this.props.place.name}
							</div>
							<div style={{ fontSize: 14 }}>
								<span style={{ color: 'grey' }}>
									{this.props.place.rating}{' '}
								</span>
								<span style={{ color: 'orange' }}>
									{String.fromCharCode(9733).repeat(Math.floor(this.props.place.rating))}
								</span>
								<span style={{ color: 'lightgrey' }}>
									{String.fromCharCode(9733).repeat(5 - Math.floor(this.props.place.rating))}
								</span>
							</div>
							{/* {showphoto()} */}
							<div style={{ fontSize: 14, color: 'grey' }}>
								{this.props.place.types[0]}
							</div>
							{/* <div style={{ fontSize: 14, color: 'grey' }}>
								{'$'.repeat(this.props.place.price_level)}
							</div> */}
							{this.opening()}
							<CardActions>
								{/* <Tooltip title="Learn more" placement="bottom">
									<Button size="small" style={{ fontSize: 14 }}>
										More
									</Button>
								</Tooltip> */}
								<Tooltip title="Add to Eat" placement="bottom">
									<IconButton className="info-button" aria-label="Add to eat"
										color={this.buttoncolor('eat')}
										onClick={() => {
											// console.log('eat')
											// setAddtype('eat')
											this.setState({ addtype: 'eat' })
											this.handleAdd("droppable-1")
										}}>
										<RestaurantIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="Add to Star" placement="bottom">
									<IconButton className="info-button" aria-label="Add to star"
										color={this.buttoncolor('star')}
										onClick={() => {
											// console.log('star')
											// setAddtype('star')
											this.setState({ addtype: 'star' })
											this.handleAdd("droppable-2")
										}}>
										<StarIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="Add to Live" placement="bottom">
									<IconButton className="info-button" aria-label="Add to live"
										color={this.buttoncolor('live')}
										onClick={() => {
											// console.log('live')
											// setAddtype('live')
											this.setState({ addtype: 'live' })
											this.handleAdd("droppable-3")
										}}>
										<LocateIcon />
									</IconButton>
								</Tooltip>
							</CardActions>
						</div>
					)
				}}
			</Mutation>
		);
	}
}

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