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
import FavoriteIcon from '@material-ui/icons/Star';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';
import SaveIcon from '@material-ui/icons/Save';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { Draggable } from 'react-beautiful-dnd';
import '../App.css';
import { Mutation } from 'react-apollo'
import { DELETE_ITEM } from '../graphql';
import { UPDATE_ITEM_INFO } from '../graphql/mutations';

// export default function SimpleCard() {
class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      anchorEl: null,
      note: this.props.place.description,
      price: this.props.place.price + "",
      duration: this.props.place.duration + "",
    }
  }
  handleExpandClick = () => {
    const expand = this.state.expanded
    this.setState({ expanded: !expand });
  }
  handleDeleteClick = () => {
    // this.props.handleDelete(this.props.id, this.props.colid)
    this.deleteItem({
      variables: {
        userid: this.props.user,
        itemId: this.props.id,
        columnId: this.props.colid
      }
    })
  }
  handleSaveClick = () => {
    this.updateItemInfo({
      variables: {
        userid: this.props.user,
        itemid: this.props.id,
        description: this.state.note,
        price: parseInt(this.state.price),
        duration: parseInt(this.state.duration),
      }
    })
  }
  handleChange = name => event => {
    // console.log(name, event.target.value)
    this.setState({ [name]: event.target.value });
  };
  handleCardClick = () => {
    this.props.socket.emit("cardclick", this.props.id)
  }
  showphoto = (place) => {
    if (place.photo)
      return (
        <CardMedia
          className="test-card-media"
          image={place.photo}
          title={place.name}
        />
      )
    else
      return
  }

  render() {
    const { place } = this.props;
    console.log("place photo", place.photo);
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided => (
          <Card className="test-card-root" {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onClick={this.handleCardClick}
          >
            <CardContent>
              <Mutation mutation={DELETE_ITEM}>{
                deleteItem => {
                  console.log("Mutation deleteItem");
                  this.deleteItem = deleteItem;

                  return (
                    <Typography variant="h5" component="h5">
                      {place.name}
                    </Typography>
                  );
                }
              }</Mutation>
              <Typography color="textSecondary" align="center" display="inline" >
                Staying time:
                <TextField
                  className="test-card-textfield-spot"
                  defaultValue={place.duration}
                  margin="none"
                  inputProps={{ 'aria-label': 'duration', className: "test-card-duration-field" }}
                  style={{ width: '20%', height: "10" }}
                  onChange={this.handleChange('duration')}
                  variant="standard"
                />
                hr
                <IconButton
                  className={clsx("test-expand", {
                    "test-expandOpen": this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon className="test-iconSmall" />
                </IconButton>
                <IconButton className="test-card-delete" color="inherit" aria-label="Delete">
                  <DeleteOutlinedIcon className="test-iconSmall" onClick={this.handleDeleteClick} />
                </IconButton>
              </Typography>
            </CardContent>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              {/* <CardMedia
                className="test-card-media"
                image={place.photo}
                title={place.name}
              /> */}
              {this.showphoto(place)}
              <CardContent>
                {/* <Typography paragraph>Note:</Typography>
                      <Typography paragraph>
                        {place.note}
                      </Typography> */}

                <TextField
                  id="outlined-dense-multiline"
                  label="Write Some Note Here"
                  className="test-card-dense test-card-textfield"
                  margin="dense"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  defaultValue={place.description}
                  style={{ width: '100%' }}
                  onChange={this.handleChange('note')}
                />
                <div className="test-but-root">

                  <TextField
                    id="outlined-dense-multiline"
                    label="Expected Expense"
                    className="test-card-dense test-card-textfield"
                    margin="dense"
                    variant="outlined"
                    defaultValue={place.price}
                    style={{ width: '80%' }}
                    onChange={this.handleChange('price')}
                  />
                  <Mutation mutation={UPDATE_ITEM_INFO}>{
                    updateItemInfo => {
                      console.log("Mutation updateItemInfo");
                      this.updateItemInfo = updateItemInfo;

                      return (
                        <Tooltip title="Save note and expense" placement="bottom">
                          <IconButton className="test-button" aria-label="Save" onClick={this.handleSaveClick}>
                            <SaveIcon className={clsx("test-leftIcon", "test-iconSmall")} />
                          </IconButton>
                        </Tooltip>
                      );
                    }
                  }
                  </Mutation>
                </div>
              </CardContent>
            </Collapse>
          </Card>)}
      </Draggable>

    );

  }
}
export default SimpleCard;