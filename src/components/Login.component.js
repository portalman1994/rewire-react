import { Component } from 'react';
import { Box, Button, TextField } from '@mui/material';
import AuthService from '../services/auth.service';
import { Redirect, Route, withRouter } from 'react-router-dom';
import Homepage from './Homepage.component';
import App from '../App';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            message: '',
            error: {
                password: false,
                username: false
            },
            currentUser: undefined
        }
    }

    handleChange = (input) => (event) => {
        this.setState({ [input]: event.target.value });
    };
    
    handleLogin(event) {
        event.preventDefault();
        this.setState({
            message: '',
            loading: true
        });
        if (this.state.password !== ('' || ' ') && this.state.username !== ('' || ' ')) {
            this.setState({
                errors: {
                    password: false,
                    username: false
                }
            });
        } else {
            this.setState({
                errors: {
                    password: true,
                    username: true
                }
            })
            console.log('Error!');
        }
        if (this.state.error.password === false || this.state.error.username === false) {
            AuthService.login(this.state.username, this.state.password)
            .then(() => {
                console.log(this.props);
                const handleChange = this.props.handleChange;
                const user = AuthService.getCurrentUser();
                
                handleChange(user);
                
                console.log('Successfully logged in!');
            },
            error => {
                const responseMessage = (
                    error.response && 
                    error.response.data && 
                    error.response.date.message
                ) || error.message || error.toString();
    
                this.setState({
                    loading: false,
                    message: responseMessage
                });
            });
        } else {
            this.setState({
                loading: false
            });
        }
    } 

    render() {
        const { username, password } = this.state;
        const values = { username, password };
        return (
            <>
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
            <Box component='form' style={{border: '4px solid grey', borderRadius: '10px', width: '300px'}}>
                <br />
                <TextField 
                    error={this.state.error.username && this.state.username.length === (0 || 1)}
                    name='username'
                    type='text'
                    placeholder='username'
                    onChange={this.handleChange('username')}
                    label='Username'
                    defaultValue={values.username}
                    />  
                <br />
                <br />
                <TextField 
                    error={this.state.error.password && this.state.password.length === (0 || 1)}
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={this.handleChange('password')}
                    label='Password'
                    defaultValue={values.password}
                    />  
                <br />
                <br />
                <Button onClick={(e) => this.handleLogin(e)}>Login</Button>                      
            </Box>
            </div>
            </>
        );
    }
}

export default Login;