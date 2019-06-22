import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import MyDayPick from './../components/MyDayPick'


const styles = {
    fab: {
      margin: 1
    },
    extendedIcon: {
      marginRight: 1
    },
    loginWrapper:{
      marginTop: 10
    },
    outterWrapper: {
        margin: 0,
    },
    innerWrapper:{
        marginTop: 50,
        textAlign: "center"
    },
    textField: {
        marginLeft: 1,
        marginRight: 1
    },
    link:{
        textDecoration: "none"
    },
    input:{
        color: "rgba(255, 255, 255, 0.65)"
    }
}

class NewProject extends React.Component{

    constructor(props){
        super(props);
        this.state = {
         
        }
      }

    render() {
        const {classes} = this.props
        return(
            <div className={classes.outWrapper}>
                <div className={classes.innerWrapper}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <div><TextField
                                id="project_name"
                                label="Project Name"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    className: classes.input
                                }}
                            /></div>
                        <div><TextField
                                id="password"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    className: classes.input
                                }}
                            /></div>
                        <div><TextField
                                id="repeat_password"
                                label="Repeat Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    className: classes.input
                                }}
                            /></div>
                        <div><TextField
                                id="destination"
                                label="Destination (optional)"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    className: classes.input
                                }}
                            /></div>
                        <div><MyDayPick /></div>
                    </form>
                    <div className={classes.loginWrapper}>
                        <Link to="/main" className={classes.link}>
                            <Fab color="primary" variant="extended" aria-label="create" className={classes.fab}>
                                <AddIcon className={classes.extendedIcon} />Create
                            </Fab>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

NewProject.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(NewProject);