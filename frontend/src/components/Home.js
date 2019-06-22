import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';
const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    IconRight:{
      marginLeft: theme.spacing(1.5),
    },
    outterWrapper: {
        margin: 0 
    },
    innerWrapper:{
        marginTop: 250,
        textAlign: "center"
    },
    link:{
        textDecoration: "none"
    }
  }));
export default function Home(props) {
    const classes = useStyles()
    
    return(
        <div className={classes.outWrapper}>
            <div className={classes.innerWrapper}>
                <div>
                </div>
                <div>
                    <Button variant="contained" color="default" className={classes.fab}>
                        <NavigationIcon className={classes.extendedIcon} /> Login
                    </Button>
                    <Button variant="contained" color="primary" className={classes.fab}>
                    <AddIcon className={classes.extendedIcon} /> New
                    </Button>
                </div>
                <div>
                    <Link to="/login" className={classes.link}>
                        <Fab variant="extended" aria-label="login" className={classes.fab}>
                            <NavigationIcon className={classes.extendedIcon} /> Login
                        </Fab>
                    </Link>
                    <Link to="/NewProject" className={classes.link}>
                        <Fab color="primary" aria-label="add" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </Link>
                  
                </div>
            </div>
        </div>

    )
}
