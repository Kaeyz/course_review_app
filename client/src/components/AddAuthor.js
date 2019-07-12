import React, { Component } from 'react';
import { graphql } from "react-apollo";

import { addAuthorMutation, getCoursesQuery } from "../queries/queries";
import keys from "../keys";


class AddAuthor extends Component {
  constructor(props) {
    super(props);
      this.state=  {
        name: "",
        age: undefined,
        verification: "",
        error: ""
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value} );
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({ error: "" });
    if (this.state.verification === keys.authKey) {
      let { name, age } = this.state;
      age = parseInt(age);
      this.props.addAuthorMutation({
        variables: { name, age },
        refetchQueries: [{query: getCoursesQuery}]
      })
    } else {
      this.setState({ error: "User verification key incorrect" });
    }
  }

  render() {
    return (
      <form id="add-course" onSubmit={this.submitForm.bind(this)}>
        <p className="error">{this.state.error}</p>
        <div className="field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
        </div>

        <div className="field">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={this.state.age}
            onChange={this.onChange} />
        </div>


        <div className="field">
          <label>User verification:</label>
          <input
            type="password"
            name="verification"
            value={this.state.verification}
            onChange={this.onChange} />
        </div>

        <button>+</button>

      </form>
    )
  }
}


export default graphql(addAuthorMutation, {name: "addAuthorMutation"})(AddAuthor);