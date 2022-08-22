import { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import Login from './Login.component';
class ProtectedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: undefined,
            auth: undefined,
            rest: {}
        }
    }

    render() {
        const { auth, component: Component, path } = this.props;

        return (          
            <Route path={path} render={(props) => {
                return auth ? <Component {...props} /> : <Redirect exact to='/login' />;
            }} />
        );
    }
}

export default ProtectedRoute;