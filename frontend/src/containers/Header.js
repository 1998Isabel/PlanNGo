import React from 'react';
import './../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Query, Mutation } from 'react-apollo'
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
import { PROJECT_NAME, UPDATE_DATE } from '../graphql'
import {withRouter} from 'react-router-dom'
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  msjh: {
    normal: 'msjh.ttf',
    bold: 'msjh.ttf',
    italics: 'msjh.ttf',
    bolditalics: 'msjh.ttf',
}
}



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

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  props.socket.on('pdfDefinition', (docDefinition)=>{
    console.log("client side pdfDefinition")
    console.log(docDefinition);
    pdfMake.createPdf(docDefinition).open();
  })

  function handleDateClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleDateClose() {
    setAnchorEl(null);
  }

  function handlePdfClick() {
    console.log("handlePdfClick!");
    props.socket.emit('pdfclick', props.user);
  }

  const onLogout = () => {
    sessionStorage.clear()
    props.history.push("/")
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;

  const userID = props.user

  let updatedate = null
  function handleDateSummit(days) {
    console.log(days)
    console.log(updatedate)
    props.socket.emit("resetRoute", "reset from drag")
    updatedate({
      variables: {
        userid: userID,
        days: days
      }
    })
  }

  return (
    <Query query={PROJECT_NAME} variables={{ userID }}>{({ loading, error, data, subscribeToMore }) => {
      if (error) return <div id="left_schedule">error</div>
      if (loading) return <div id="left_schedule">loading...</div>
      return (
        <div className={classes.root}>
          <AppBar variant="dense" position="relative" className={classes.bar}>
            <Toolbar variant="dense">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {data.users.projectName}
              </Typography>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Print">
                <TodayIcon onClick={handleDateClick} />
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
                  <Mutation mutation={UPDATE_DATE}>{
                    updateDate => {
                      updatedate = updateDate
                      return (
                        <MyDayPick InNewProject={false} user={userID} onClick={handleDateSummit} />
                      )
                    }
                  }</Mutation>
                </Popover>
              </IconButton>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Print">
                <PrintIcon onClick={handlePdfClick}/>
              </IconButton>
              <Button onClick={onLogout} color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }}</Query>
  )
}

export default withRouter(Header);