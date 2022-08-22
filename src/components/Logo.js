import { Component } from 'react';
import '../App.css';
import { Sensors } from '@mui/icons-material';

class Logo extends Component {

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', paddingLeft: '30px'}}>
                <Sensors />
                <p style={{marginLeft: '5px', marginTop: '5px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '20px'}}>Rewire</p>
            </div>
        );
    }
}

export default Logo;