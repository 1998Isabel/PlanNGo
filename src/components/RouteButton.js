import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
    //float: "right",
    //textAlign: "right",
	},
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <Button size="small" variant="contained" color="primary" className={classes.button}>
      Route!
    </Button>
  );
}