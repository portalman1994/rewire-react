import { Component } from 'react';
import { Home, AddCircleOutline, AccountCircle } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Link, Route, withRouter } from 'react-router-dom';
import Form from './Form.component';
import App from '../App';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: {
                home: {id: "home", icon: <Home sx={{ width: 32, height: 32 }} key={"home-icon"} />, title: "Home Menu", link: '/rewire', path: "/rewire", element: App},
                form: {id: "form", icon: <AddCircleOutline sx={{ width: 32, height: 32 }} key={"form-icon"} />, title: "Thought Form", link: '/add', path: '/add', element: Form},
                account: {id: "account", icon: <AccountCircle sx={{ width: 32, height: 32 }} key={"account-icon"} />, title: "Account Settings", link: '/account', path: '/account', element: null}
            },
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value, key) {
        switch (value) {
            case 'home':
                this.setState({menuItems: { 
                    home: {id: "home", icon: <Home sx={{ width: 32, height: 32 }} key={"home-icon"} />, title: "Home Menu", link: '/rewire', path: "/rewire", element: App},
                    form: {id: "form", icon: <AddCircleOutline sx={{ width: 32, height: 32 }} key={"form-icon"} />, title: "Thought Form", link: '/add', path: '/add', element: Form},
                    account: {id: "account", icon: <AccountCircle sx={{ width: 32, height: 32 }} key={"account-icon"} />, title: "Account Settings", link: '/account', path: '/account', element: null}
                }});
            break;
            case 'form':
                this.setState({menuItems: { 
                    home: {id: "home", icon: <Home sx={{ width: 32, height: 32 }} key={"home-icon"} />, title: "Home Menu", link: '/rewire', path: "/rewire", element: App},
                    form: {id: "form", icon: <AddCircleOutline sx={{ width: 32, height: 32 }} key={"form-icon"} />, title: "Thought Form", link: '/add', path: '/add', element: Form},
                    account: {id: "account", icon: <AccountCircle sx={{ width: 32, height: 32 }} key={"account-icon"} />, title: "Account Settings", link: '/account', path: '/account', element: null}
                }});        
            break;
            case 'account':
                this.setState({menuItems: { 
                    home: {id: "home", icon: <Home sx={{ width: 32, height: 32 }} key={"home-icon"} />, title: "Home Menu", link: '/rewire', path: "/rewire", element: App},
                    form: {id: "form", icon: <AddCircleOutline sx={{ width: 32, height: 32 }} key={"form-icon"} />, title: "Thought Form", link: '/add', path: '/add', element: Form},
                    account: {id: "account", icon: <AccountCircle sx={{ width: 32, height: 32 }} key={"account-icon"} />, title: "Account Settings", link: '/account', path: '/account', element: null}
                }});            
            break;
            default:
                return null;
        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', paddingRight: '30px'}}>
                <Box>
                    {Object.keys(this.state.menuItems).map((value, key) => {
                        return (
                            <Tooltip title={this.state.menuItems[value]['title']} key={`${this.state.menuItems[value]['id']}-tooltip`}>        
                                <Link to={this.state.menuItems[value]['link']} key={`${this.state.menuItems[value]['id']}-link`}>
                                    <IconButton
                                        onClick={() => this.handleClick(value, key)}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        key={`${this.state.menuItems[value]['id']}-button`}
                                    >
                                        {this.state.menuItems[value]['icon']}
                                    </IconButton>
                                </Link>
                            </Tooltip>
                    )})}
                </Box>
            </div>
        );
    }
}

export default MenuBar;