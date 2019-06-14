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
// const uuidv1 = require('uuid/v1');
import { Draggable } from 'react-beautiful-dnd';
import '../App.css';

// export default function SimpleCard() {
class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }
  handleExpandClick = () => {
    const expand = this.state.expanded
    this.setState({expanded: !expand});
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
              <Typography className="test-card-title" color="textSecondary" gutterBottom>
                {place.type}
                <FavoriteIcon style={{float: "right"}}/>
              </Typography>
              <Typography variant="h5" component="h2">
                {place.name}
              </Typography>
              <Typography className="test-card-pos" color="textSecondary">
                Staying time: {place.staying}
                </Typography>
              <Typography variant="body2" component="p">
                {this.props.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
              <IconButton
                className={clsx("test-expand", {
                  "test-expandOpen": this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  {place.note}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>)}
      </Draggable>
    );
  }
}
export default SimpleCard;