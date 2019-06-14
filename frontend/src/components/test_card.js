import React ,{Component}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
//   const classes = useStyles();
    render () {
    const bull = <span className="test-card-bullet">•</span>;
    return (
        <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided=>(
            <Card className="test-card-root" {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}>
            <CardContent>
                <Typography className="test-card-title" color="textSecondary" gutterBottom>
                Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                be
                {bull}
                nev
                {bull}o{bull}
                lent
                </Typography>
                <Typography className="test-card-pos" color="textSecondary">
                adjective
                </Typography>
                <Typography variant="body2" component="p">
                {this.props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>)}
            </Draggable>
      );
} 
}
export default SimpleCard;