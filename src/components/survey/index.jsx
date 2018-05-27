import React, { Component } from 'react';
import qBank from './qbank.js';
// import axios from 'axios';


class Survey extends Component {
    constructor() {
        super();

        this.state = {
            answers: new Array(10).fill(false),
            zip: ''
        };

        this.handleOptionChange = this.handleOptionChange.bind(this); // bind like this if you're passing down a function
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleOptionChange(num, name) {
        let newAnswers = this.state.answers;
        newAnswers[name - 1] = num;
        this.setState({
            answers: newAnswers
        });
        console.log(this.state.answers);
    }

    updateZip(event) {
        this.setState({
            zip: event.target.value.substr(0, 5)
        });
    }

    handleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        console.log('Submit');
        console.log(this.state.answers);
        console.log('kids?', this.state.answers[3]);
        console.log('Zip Code', this.state.zip);
        // axios.post('/api/pets', {
        //     answers : this.state.answers,
        //     zipcode : this.state.zip
        // })
        //     .then((res) => {
        //         console.log(res);
        //     });
    }

    render() {
        return (
            <div className="Survey">
                <h2>Dog Breed Selector Quiz</h2>
                <form onSubmit={this.handleFormSubmit} className="choices">
                    <ol>
                        {qBank.map((question) => {
                            return <Question q={question.q} c={question.c} name={question.id} key={question.id} handleOptionChange={this.handleOptionChange} />
                        })}
                    </ol>
                    <div className="row">
                        <div className="input-field col s3">
                            <i className="material-icons prefix">local_post_office</i>
                            <input id="icon_prefix" type="text" className="validate" 
                                value={this.state.zip}
                                onChange={this.updateZip.bind(this)}
                            />
                            <label htmlFor="icon_prefix">ZIP code</label>
                        </div>
                    </div>
                    <button className="btn btn-default" type="submit" onClick={this.handleFormSubmit}>See Available Dogs!</button>
                </form>
            </div>
        );
    }
}

class Question extends Component {
    render() {
        const { q, c, name, handleOptionChange } = this.props;
        return (
            <li className="question">
                <p><strong>{q}</strong></p>

                {c.map((choice) => {
                    return <Choice
                        option={choice.option}
                        num={choice.id}
                        name={name}
                        key={choice.id}
                        handleOptionChange={handleOptionChange}
                    />
                })}

            </li>
        );
    }
}

class Choice extends Component {
    render() {
        const { option, num, name, handleOptionChange } = this.props;
        return (
            <p>
                <label>
                    <input type="radio" className="with-gap" name={name} value={num} onClick={()=> handleOptionChange(num, name)} />
                    <span>{option}</span>
                </label>
            </p>
        );
    }

};


export default Survey;