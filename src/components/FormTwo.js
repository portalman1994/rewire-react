import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import App from '../App';

class FormTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true       
        }
    }
    
    handleClose = (event, response) => {
        const { open } = this.state;
        const { history } = this.props;

        if(response && response === 'backdropClick') {
            this.setState({open: !open});
            history.push("/rewire");
        }
    }

    render() {
        const { open } = this.state;
        const { back, handleChange, next, values } = this.props;
        return (
            <div>
            <Dialog open={open}  onClose={this.handleClose}>
                <DialogTitle>Reframe Thoughts</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField 
                        label='third'
                        placeholder='third'
                        multiline
                        rows={4}
                        onChange={handleChange('thirdThought')}
                        defaultValue={values.thirdThought}
                    />
                    <br />
                    <br />
                    <TextField 
                        label='fourth'
                        placeholder='fourth'
                        multiline
                        rows={4}
                        onChange={handleChange('fourthThought')}
                        defaultValue={values.fourthThought}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={back}>Back</Button>
                    <Button onClick={next}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Route exact path="/" component={App} />
            </div>
        );
    }
}

export default withRouter(FormTwo);