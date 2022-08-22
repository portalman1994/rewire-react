import { Component } from 'react';
import { Link, Redirect, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import Form from './components/Form.component';
import EditForm from './components/EditForm.component';
import Homepage from './components/Homepage.component';
import Login from './components/Login.component';
import Register from './components/register.component';
import AuthService from './services/auth.service';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();          
    this.setState({
        currentUser: user
    });
  }

  logOut() {
    AuthService.logout();
  }
  handleChange = (input) => {
    this.setState({ currentUser: input });
    console.log(input);
    console.log(this.state);
  };
  render() {
    return (
      <div className='App'>
          <Switch>
              <UnprotectedRoute path='/login' auth={this.state.currentUser} handleChange={this.handleChange} component={Login} />
    
              <ProtectedRoute path='/rewire' auth={this.state.currentUser} component={Homepage} />
              <ProtectedRoute path='/add' auth={this.state.currentUser} component={Form} />
              <ProtectedRoute path='/account' auth={this.state.currentUser} component={null} />
              <ProtectedRoute path='/:id' auth={this.state.currentUser} component={EditForm} />
              <Route path='/' >
                <Redirect to='/rewire' />  
              </Route>
          </Switch>
      </div>
    );
  }
}
export default App;