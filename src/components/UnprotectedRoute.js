import { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import Login from './Login.component';
class UnprotectedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: undefined,
            auth: undefined,
            rest: {}
        }
    }

    render() {
        const { auth, children, handleChange, component: Component, path } = this.props;

        return (          
            <Route path={path} render={() => {
                return auth ? <Redirect to='/rewire' /> : <Component currentUser={auth} handleChange={handleChange} />;
            }} />
        );
    }
}

export default UnprotectedRoute;