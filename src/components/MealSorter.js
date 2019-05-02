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
    this.setState({ mealName: event.target.value }, () => {
      this.props.updateRatedFoods(this.state.mealName);
    });
  }

  handleOptionChange(event) {

    this.setState({ selectedOption: event.target.value }, () => {
      this.props.updateRatedFoods(this.state.selectedOption);
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.mealName);
    event.preventDefault();
  }

  render() {
    return (
      <div className="MealSorterForm">
        <form onSubmit={this.handleSubmit}>
          <input id="searchbar" type="text" value={this.state.mealName} onChange={this.handleChange} placeholder="Sök maträtt" />
          <div>
            <input type="radio" value="option1" id="mostPopular" className="radioButton"
              checked={this.state.selectedOption === 'option1'}
              onChange={this.handleOptionChange} />
            <label htmlFor="mostPopular" className="radioLabel">Mest populärt</label>
            <input type="radio" value="option2" id="leastPopular" className="radioButton"
              checked={this.state.selectedOption === 'option2'}
              onChange={this.handleOptionChange} />
            <label htmlFor="leastPopular" className="radioLabel">Minst populärt</label>
          </div>
          <button type="submit" id="searchButton">Sök</button>
        </form>
      </div>
    )
  }
}
