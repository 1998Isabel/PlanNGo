import React, { Component } from 'react';
import clsx from 'clsx';
import socketIOClient from "socket.io-client";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarIcon from '@material-ui/icons/Star';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';
import SaveIcon from '@material-ui/icons/Save';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { Draggable } from 'react-beautiful-dnd';
import '../App.css';
import { Mutation } from 'react-apollo'
import { DELETE_ITEM, UPDATE_ITEM_INFO } from '../graphql';

var details = null

// export default function SimpleCard() {
class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      expanded2: false,
      anchorEl: null,
      note: this.props.place.description,
      price: this.props.place.price + "",
      duration: this.props.place.duration + "",
    }
  }
  componentDidMount() {
    this.props.socket.on("getRouteDetail", (data) => {
      if (data) {
        console.log(data, this.props.id)
        const detail = data.details.find(ele => (ele.id === this.props.id))
        if (detail) {
          this.handleExpandOpen(detail)
        }
      }
    })
    this.props.socket.on("resetDirect", (data) => {
      console.log("Reset Route", data)
      this.handleExpandClose(null)
    })
  }
  handleExpandClick = () => {
    const expand = this.state.expanded
    this.setState({ expanded: !expand });
  }
  handleExpandOpen = (detail) => {
    const expand2 = this.state.expanded2
    details = detail
    this.setState({ expanded2: true });
  }
  handleExpandClose = (detail) => {
    const expand2 = this.state.expanded2
    details = detail
    this.setState({ expanded2: false });
  }
  handleDeleteClick = () => {
    console.log("Delete")
    this.props.socket.emit("resetRoute", "reset from delete")
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
  showtypeicon = () => {
    if (this.props.place.type === "eat")
      return (
        <RestaurantIcon color="secondary" style={{ float: "left", marginRight: "10" }} />
      )
    else if (this.props.place.type === "star")
      return (
        <StarIcon color="secondary" style={{ float: "left", marginRight: "10" }} />
      )
    else if (this.props.place.type === "live")
      return (
        <LocateIcon color="secondary" style={{ float: "left", marginRight: "10" }} />
      )
  }
  showdetail = () => {
    console.log("CARE DETAIL", details)
    console.log(this.state.expanded2)
    if (details) {
      // this.handleExpand2();
      return (
        "Distance: " + details.distance + " Duration: " + details.duration
      )
    }
  }

  getStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.5s`,
    };
  }

  render() {
    const { place } = this.props;

    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Card className="test-card-root" {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onClick={this.handleCardClick}
            style={this.getStyle(provided.draggableProps.style, snapshot)}
          >
            <CardContent>
              <Mutation mutation={DELETE_ITEM}>{
                deleteItem => {
                  console.log("Mutation deleteItem");
                  this.deleteItem = deleteItem;

                  return (
                    <Typography variant="h5" component="h5">
                      {this.showtypeicon()}
                      {place.name}
                    </Typography>
                  );

                }
              }</Mutation>
              <Typography color="textSecondary" align="center" display="inline">
                Staying time:
                <TextField
                  className="test-card-textfield"
                  defaultValue={place.duration}
                  margin="none"
                  inputProps={{ 'aria-label': 'duration', className: "test-card-duration-field" }}
                  style={{ width: '20%', height: "10" }}
                  onChange={this.handleChange('duration')}
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
            <Collapse in={this.state.expanded2} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  {this.showdetail()}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>)}
      </Draggable>

    );
  }
}
export default SimpleCard;