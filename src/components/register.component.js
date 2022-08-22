import { Component } from 'react';
import { Box, Button, TextField } from '@mui/material';
import AuthService from '../services/auth.service';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            successful: false,
            message: '',
            error: {
                password: false,
                username: false,
                email: false
            }
        }
    }

    handleChange = (input) => (event) => {
        this.setState({ [input]: event.target.value });
    };

    validateForm() {
        if (this.state.password !== ('' || ' ') && this.state.username !== ('' || ' ') && this.state.email !== ('' || ' ')) {
            this.setState({
                error: {
                    password: false,
                    username: false,
                    email: false
                }
            });
        } else {
            this.setState({
                error: {
                    password: true,
                    username: true,
                    email: true
                }
            });
        }
    }

    handleRegister(event) {
        event.preventDefault();
        this.setState({
            message: '',
            successful: false
        });
        this.validateForm();
        if (this.state.error.password === false && this.state.error.username === false && this.state.error.email === false) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
            },
            error => {
                const responseMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) || error.message || error.toString()
                this.setState({
                    message: responseMessage,
                    successful: false
                });
            });
            const { history }= this.props;
            history.push('/login');
            window.location.reload();
        }
    }
    render() {
        const { username, password, email } = this.state;
        const values = { username, password, email };
        return (
            <Box component='form'>
                <TextField 
                    error={this.state.error.username && this.state.username.length === (0 || 1)}
                    name='username'
                    type='text'
                    placeholder='username'
                    onChange={this.handleChange('username')}
                    label='Username'
                    defaultValue={values.username}
                />  
                <TextField 
                    error={this.state.error.email && this.state.email.length === (0 || 1)}
                    name='email'
                    type='email'
                    placeholder='email'
                    onChange={this.handleChange('email')}
                    label='Email'
                    defaultValue={values.email}
                />  
                <TextField 
                    error={this.state.error.password && this.state.password.length === (0 || 1)}
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={this.handleChange('password')}
                    label='Password'
                    defaultValue={values.password}
                />  
                <Button onClick={(e) => this.handleRegister(e)}>Login</Button>                      
            </Box>
        );
    }
}

export default Register;