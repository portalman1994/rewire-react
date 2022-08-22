import { Component } from 'react';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import RewireDataService from '../services/rewire.service';
import { Redirect, withRouter } from 'react-router-dom';

class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            firstThought: '' ,
            secondThought: '',
            thirdThought: '',
            fourthThought: '',
            date: new Date().toString(),
            submitted: false,
            step: 1
        } 
        this.getThought = this.getThought.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        this.getThought(this.props.match.params.id);
    }

    getThought(id) {
        RewireDataService.get(id)
        .then(response => {
            console.log(response);
            this.setState({
                firstThought: response.data.firstThought,
                secondThought: response.data.secondThought,
                thirdThought: response.data.thirdThought,
                fourthThought: response.data.fourthThought,
                id: response.data.id
            });
            console.log(response.data);
        })
       .catch(e => {
            console.log(e);
        })
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

    submit(values) {
        let data = {
            id: values.id,
            firstThought: values.firstThought,
            secondThought: values.secondThought,
            thirdThought: values.thirdThought,
            fourthThought: values.fourthThought,
            date: new Date().toString()
        };
        
        RewireDataService.update(data.id, data)
        .then(response => {
            console.log(response.data);
        })
       .catch(e => {
            console.log(e);
        })
    }

    render() {
        const { step } = this.state;
        const { firstThought, secondThought, thirdThought, fourthThought, date, id } = this.state;
        const values = { firstThought, secondThought, thirdThought, fourthThought, date, id };
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

export default EditForm;