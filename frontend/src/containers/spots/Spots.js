import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


class Spots extends Component {
  constructor(props){
    super(props);
    this.state ={
      value:null
    }
  }
  
  handleChange = (e, newValue) => [
    this.setState({
      value: newValue
    })
  ]
  render() {
    let value = this.state.value
    return (
      // <Droppable>
        <div id="middle_spot">
          <span>Spots</span>
          <div className="spots-root">
            {/* <AppBar position="static" color="default"> */}
            <Paper square className="spots-root">
              <Tabs
                value={value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label="Eat" icon={<RestaurantIcon /> } style={{ padding: 4, width:'30%' }} />
                <Tab label="Favorite" icon={<FavoriteIcon />} style={{ padding: 4, width:'30%' }} />
                <Tab label="Accommodation" icon={<LocateIcon />} style={{ padding: 4, width:'30%' }} />
              </Tabs>
            </Paper>
            {value === 0 && <TabContainer>Item One</TabContainer>}
            {value === 1 && <TabContainer>Item Two</TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>}
          </div>
        </div>
      // </Droppable>
    );
  }
}

export default Spots;