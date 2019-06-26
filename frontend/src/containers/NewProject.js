import React from 'react';
import { withStyles } from '@material-ui/styles';
import {withRouter} from 'react-router-dom'
import { withApollo, Mutation } from 'react-apollo';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import MyDayPick from './../components/MyDayPick'
import CryptoJS from 'crypto-js';
import { LOGIN_MATCH } from '../graphql/queries';
import { CREATE_USER } from '../graphql';
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
            username: "",
            password: "",
            destination: "",
            collision_error: false,
            days: []
            
        }
      }
    handleUserChange = e => {this.setState({
        username : e.target.value
    })} 

    handleDestinationrChange = e => {this.setState({
        destination : e.target.value
    })} 

    handlePasswordChange = e => {this.setState({
        password : e.target.value
    })} 

    handleDaySubmit = days => {
        this.setState({
            days: days
        })
        console.log("DAYS",days)
    }

    onSubmit = e => {
        let collision = false
        const IDandPassword = this.state.username + this.state.password
        const myHash = CryptoJS.SHA256(IDandPassword).toString(CryptoJS.enc.Hex)
        this.props.client.query({query: LOGIN_MATCH, variables:{hash: myHash}}).then(result => {
            if(result.data.loginMatch){
                collision = true
            }
            else{
                // Mutation here
                if (this.state.days.length !== 0){
                    this.userSubmit({
                        variables: {
                            hash: myHash,
                            projectName: this.state.username,
                            totalDays: this.state.days,
                            // firstDay: this.state.days[0]
                        }
                    })
                }
            }  

            if(this.state.username === "" || collision){
                this.setState({
                    collision_error: true
                })
                return
            }

            this.props.history.push('/login')
        })
       
    }

    render() {
        const {classes} = this.props
        console.log("NewProject state", this.state.days)
        return(
            <Mutation mutation={CREATE_USER}>{
                submit => {
                this.userSubmit = submit
                return(
                <div className={classes.outWrapper}>
                    <div className={classes.innerWrapper}>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div><TextField
                                    id="project_name"
                                    label="Project Name"
                                    className={classes.textField}
                                    onChange={this.handleUserChange}
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
                                    onChange={this.handlePasswordChange}
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
                                    onChange={this.handleDestinationChange}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                /></div>
                            <div><MyDayPick daySubmit={this.handleDaySubmit} InNewProject={true}/></div>
                        </form>
                        <div className={classes.loginWrapper}>
                            <Fab onClick={this.onSubmit} color="primary" variant="extended" aria-label="create" className={classes.fab}>
                                <AddIcon className={classes.extendedIcon} />Create
                            </Fab>
                        </div>
                    </div>
                </div>)}
            }</Mutation>
        )
    }
}

NewProject.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withApollo(withRouter(withStyles(styles)(NewProject)));