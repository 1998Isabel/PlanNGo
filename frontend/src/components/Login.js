import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon:{
      marginRight: theme.spacing(1),
    },
    loginWrapper:{
      marginTop: theme.spacing(3),
    },
    outterWrapper:{
        margin: 0 
    },
    innerWrapper:{
        marginTop: 180,
        textAlign: "center"
    },
    textField:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    link:{
        textDecoration: "none"
    }
  }));

export default function Login(props) {
    const classes = useStyles()
    
    return(
        <div className={classes.outWrapper}>
            <div className={classes.innerWrapper}>
                <form className={classes.container} noValidate autoComplete="off">
                <div><TextField
                        id="outlined-project-input"
                        label="Project Name"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div><TextField
                        id="outlined-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    /></div>
                </form>
                <div className={classes.loginWrapper}>
                    <Link to="/main" className={classes.link}>
                        <Fab variant="extended" aria-label="login" className={classes.fab}>
                            <NavigationIcon className={classes.extendedIcon} />Login
                        </Fab>
                    </Link>
                </div>
            </div>
        </div>
    )
}
