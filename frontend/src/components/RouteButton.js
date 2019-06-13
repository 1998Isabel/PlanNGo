import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
		float: "right"
	},
	input: {
		display: 'none',
	},
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <Button variant="contained" color="primary" className={classes.button}>
        Route!
        {/* <DeleteIcon className={classes.rightIcon} /> */}
      </Button>
  );
}