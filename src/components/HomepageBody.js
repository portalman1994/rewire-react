import { Grid } from '@mui/material';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ThoughtPreview from './ThoughtPreview';

class HomepageBody extends Component {
    render() {
        return (
            <Grid container style={{display: 'flex', alignItems: 'center',  justifyContent: 'center'}}>
                 <Grid container columns={{xs: 4, sm: 8, md: 12}}>
                    <ThoughtPreview />
                </Grid>
            </Grid>
        );
    }
}

export default HomepageBody;