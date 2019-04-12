import React, { Component } from 'react'
import '../styles/MealSorter.css'

export default class Meal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mealName: "",
          selectedOption: 'option1',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({mealName: event.target.value});
      this.props.updateRatedFoods(this.state.mealName);
    }

    handleOptionChange(event) {
      this.setState({
        selectedOption: event.target.value
      });
      this.props.updateRatedFoods(this.state.selectedOption);
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.mealName);
      event.preventDefault();
    }

    render() {
        return (
            <div className="MealSorterForm">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Maträtt
                  <input type="text" value={this.state.mealName} onChange={this.handleChange} />
                </label>
                <div className="radio">
                  <label>
                    <input type="radio" value="option1"
                                  checked={this.state.selectedOption === 'option1'}
                                  onChange={this.handleOptionChange} />
                    MEST POPULÄRT
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="option2"
                                  checked={this.state.selectedOption === 'option2'}
                                  onChange={this.handleOptionChange} />
                    MINST POPULÄRT
                  </label>
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
        )
    }
}
