import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import App from '../App'

class FormOne extends Component {
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
            this.setState({ open: !open });
            history.push("/rewire");

        }
    }

    render() {
        const { open } = this.state;
        const { handleChange, next, values } = this.props;
        return (
            <div>
            <Dialog open={open} onClose={this.handleClose} >
                <DialogTitle>Reframe Thoughts</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField 
                        label='first'
                        placeholder='first'
                        multiline
                        rows={4}
                        onChange={handleChange('firstThought')}
                        defaultValue={values.firstThought}
                    />
                    <br />
                    <br />
                    <TextField 
                        label='second'
                        placeholder='second'
                        multiline
                        rows={4}
                        onChange={handleChange('secondThought')}
                        defaultValue={values.secondThought}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={next}>Next</Button>
                </DialogActions>
            </Dialog>
            <Route exact path="/rewire" component={App} />
            </div>
        );
    }
}

export default withRouter(FormOne);