import { Component } from 'react';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import RewireDataService from '../services/rewire.service';
import { Redirect, withRouter } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstThought: '' ,
            secondThought: '',
            thirdThought: '',
            fourthThought: '',
            date: new Date().toString(),
            submitted: false,
            step: 1
        } 
    }

    next = (event) => {
        event.preventDefault();
        const { step } = this.state;
        this.setState({
            step: step + 1,
        });
    };

    back = (event) => {
        event.preventDefault();
        const { step } = this.state;
        this.setState({
            step: step - 1,
        });
    };

    handleChange = (input) => (event) => {
        this.setState({ [input]: event.target.value });
    };

    submit = (values) => {
        let data = {
            firstThought: values.firstThought,
            secondThought: values.secondThought,
            thirdThought: values.thirdThought,
            fourthThought: values.fourthThought,
            date: values.date
        }
        console.log(data);
        RewireDataService.create(data)
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const { step } = this.state;
        const { firstThought, secondThought, thirdThought, fourthThought, date } = this.state;
        const values = { firstThought, secondThought, thirdThought, fourthThought, date };

        switch (step) {
            case 1:
                return (
                    <FormOne 
                        handleChange={this.handleChange}
                        values={values}
                        next={this.next} 
                    />
                );
            case 2:
                return (
                    <FormTwo
                        handleChange={this.handleChange}
                        values={values}
                        back={this.back}
                        next={this.next}
                    />
                );
            case 3:
                this.submit(values);
                return <Redirect push to="/rewire" />
            default:
                return;
        }
    }
}

export default Form;