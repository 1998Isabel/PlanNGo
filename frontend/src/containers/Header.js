import React, { Component } from 'react';
import './../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PrintIcon from '@material-ui/icons/Print';
// import SaveIcon from '@material-ui/icons/Save';
import TodayIcon from '@material-ui/icons/Today';
import MyDayPick from './../components/MyDayPick'
import { PROJECT_NAME } from '../graphql'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleDateClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleDateClose() {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;


  const userID = props.user
  return(
      <Query query={PROJECT_NAME} variables={{userID}}>{({loading, error, data, subscribeToMore}) => {
        if(error) return <div id="left_schedule">error</div>
        if(loading) return <div id="left_schedule">loading...</div>
        return (
          <div className={classes.root}>
            <AppBar position="relative" className={classes.bar}>
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {data.users.projectName}
                </Typography>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Print">
                  <TodayIcon onClick={handleDateClick}/>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleDateClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <MyDayPick InNewProject={false}/>
                  </Popover>
                </IconButton>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Print">
                  <PrintIcon/>
                </IconButton>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
        );
      }}</Query>
  )
}






// export default Header;