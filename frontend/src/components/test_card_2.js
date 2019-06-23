import React, { Component } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { Draggable } from 'react-beautiful-dnd';
import '../App.css';

// export default function SimpleCard() {
class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      anchorEl: null
    }
  }
  handleExpandClick = () => {
    const expand = this.state.expanded
    this.setState({expanded: !expand});
  }
  handleDeleteClick = () => {
    this.props.handleDelete(this.props.id, this.props.colid)
  }
  render() {
    const { place } = this.props;
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided => (
          <Card className="test-card-root" {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}>
            <CardContent>
              {/* <Typography className="test-card-title" color="textSecondary" gutterBottom>
                {place.type}
                
              </Typography> */}
              <Typography variant="h5" component="h2">
                {place.name}
                <IconButton className="test-card-delete" color="inherit" aria-label="Delete">
                  <DeleteOutlinedIcon  onClick={this.handleDeleteClick}/>
                </IconButton>
              </Typography>
              <Typography className="test-card-pos" color="textSecondary">
                Staying time: {place.duration} hr
                </Typography>
              <Typography variant="body2" component="p">
                {this.props.description}
              </Typography>
            </CardContent>
          </Card>)}
      </Draggable>
    );
  }
}
export default SimpleCard;