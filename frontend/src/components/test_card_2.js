import React ,{Component}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// const uuidv1 = require('uuid/v1');
import { Draggable } from 'react-beautiful-dnd';
import '../App.css';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// export default function SimpleCard() {
class SimpleCard extends Component {
    constructor(props){
        super(props);
    }
    render () {
      const { place } = this.props
      return (
        <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided=>(
            <Card className="info-card" {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}>
            <CardActionArea>
              <CardMedia
                className="info-media"
                image={place.photo}
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
          </Card>)}
            </Draggable>
      );
} 
}
export default SimpleCard;