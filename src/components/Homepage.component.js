import { Component } from 'react';
import NavigationBar from './NavigationBar';
import HomepageBody from './HomepageBody';
import { withRouter } from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <HomepageBody />
            </div>
            
        );
    }
}

export default Homepage;