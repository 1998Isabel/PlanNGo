import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';
import { timingSafeEqual } from 'crypto';

class InfoWindow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addtype: null,
		};
	}
	// const { place } = props;
	// const [addtype, setAddtype] = React.useState(null);

	infoWindowStyle = {
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

	opening = () => {
		const { place } = this.props;
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

	showphoto = () => {
		if (this.props.place.photos)
			return (
				// <div>
				// 	<img className="image-img" height="30vh" minWidth="32vh" src={place.photos[0].getUrl()} />
				// </div>
				this.props.place.photos[0].getUrl()
			)
		else
			return ""
	}

	buttoncolor = (type) => {
		if (this.state.addtype === type)
			return "secondary"
		else
			return ""
	}

	handlemutation = (type) => {
		let typeid = "";
		if (type === "droppable-1") typeid = "eat"
		if (type === "droppable-2") typeid = "favorate"
		if (type === "droppable-3") typeid = "live"
		// this.setState({ addtype: typeid })

		const { place } = this.props;
		console.log(type)
		// this.mycreateItem({
		// 	variables: {
		// 		id: type,
		// 		$placeid: place.placeid,
		// 		$name: place.name,
		// 		$type: this.state.addtype,
		// 		$note: place.types[0],
		// 		$photo: this.showphoto,
		// 		$price: place.price_level,
		// 	}
		// })
	}

	render() {
		const { place } = this.props;
		return (
			<div style={this.infoWindowStyle}>
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
				{this.opening()}
				<Mutation mutation={CREATE_ITEM}>
					{createItem => {
						console.log(createItem)
						this.mycreateItem = createItem

						return (
							<CardActions>
								<Button size="small" style={{ fontSize: 14 }}>
									More
							</Button>
								<IconButton className="info-button" aria-label="Add to eat"
									color={this.buttoncolor('eat')}
									// onClick={() => {
									// 	// console.log('eat')
									// 	this.state.setState({ addtype: 'eat'})
									// 	this.handlemutation("droppable-1")
									// }}>
									// onClick={this.handlemutation("droppable-1")}
								>
									<RestaurantIcon />
								</IconButton>
								<IconButton className="info-button" aria-label="Add to favorate"
									color={this.buttoncolor('favorate')}
									// onClick={() => {
									// 	// console.log('favorate')
									// 	setAddtype('favorate')
									// 	handlemutation("droppable-2")
									// }}
									// onClick={this.handlemutation("droppable-2")}
								>
									<FavoriteIcon />
								</IconButton>
								<IconButton className="info-button" aria-label="Add to live"
									color={this.buttoncolor('live')}
									// onClick={this.handlemutation("droppable-3")}
								>
								<LocateIcon />
								</IconButton>
							</CardActions>
						)
					}}
				</Mutation>
			</div>

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