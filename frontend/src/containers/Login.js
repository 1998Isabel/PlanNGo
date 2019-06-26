import React from 'react';
import CryptoJS from 'crypto-js';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import { withStyles } from '@material-ui/styles';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { LOGIN_MATCH } from '../graphql/queries';
const styles = {
    fab: {
      margin: 1
    },
    extendedIcon:{
      marginRight: 1
    },
    loginWrapper:{
      marginTop: 3
    },
    outterWrapper:{
        margin: 0 
    },
    innerWrapper:{
        marginTop: 180,
        textAlign: "center"
    },
    textField:{
        marginLeft: 1,
        marginRight: 1
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
    // cssOutlinedInput: {
    //     '&$cssFocused $notchedOutline': {
    //       borderColor: `${theme.palette.primary.main} !important`,
    //     }
    //   },
    
    // notchedOutline: {
    //     borderWidth: '1px',
    //     borderColor: 'green !important'
    // },
}

class Login extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            error: false
        }
    }
    componentDidMount(){
        // resetStore   
    }
    handleUserChange = e => {
        this.setState({
        username : e.target.value
    })} 

    handlePasswordChange = e => {this.setState({
        password : e.target.value
    })} 
      
    onSubmit = e => {
        const IDandPassword = this.state.username + this.state.password
        const myHash = CryptoJS.SHA256(IDandPassword).toString(CryptoJS.enc.Hex)
        console.log("ID and Hash",IDandPassword,myHash)
        this.props.client.query({fetchPolicy: 'network-only', query: LOGIN_MATCH, variables:{hash: myHash}}).then(result => {
            if(result.data.loginMatch){
                this.props.setUser(myHash)
                this.props.history.push('/main')
            }
            else{
                this.setState({
                    error: true
                })
            }  
        })
    }
    render(){
        const {classes} = this.props
        return(
            <div className={classes.outWrapper}>
                <div className={classes.innerWrapper}>
                    <form className={classes.container} noValidate autoComplete="off">
                    <div><TextField
                            id="outlined-project-input"
                            label="Project Name"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleUserChange}
                            InputProps={{
                                className: classes.input,
                                //root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                //notchedOutline: classes.notchedOutline,
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
                            onChange={this.handlePasswordChange}
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
                        <Fab onClick={this.onSubmit} variant="extended" aria-label="login" className={classes.fab}>
                            <NavigationIcon className={classes.extendedIcon} />Login
                        </Fab>
                    </div>
                    {this.state.error && <span>username or password incorrect</span>}
                </div>
            </div>
        )
    }
  
        
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withApollo(withRouter(withStyles(styles)(Login)));