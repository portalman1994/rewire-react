import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from './Logo';
import MenuBar from './MenuBar';

class NavigationBar extends Component {
    render() {
        return (
            <div style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <Logo />
                <MenuBar />
            </div>
        );
    }
}

export default NavigationBar;