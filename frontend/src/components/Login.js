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
    },
    input:{
        color:"rgba(255, 255, 255, 0.65)"
    },
    cssLabel:{
        color:"rgba(255, 255, 255, 0.65)"
    },
    cssFocused:{
        color:"white"
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
        }
      },
    
    
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'green !important'
    },
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
                        // type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                        }}
                    /></div>
                <div><TextField
                        id="outlined-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                        }}
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
