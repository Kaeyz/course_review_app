import React, { Component } from 'react';
import { graphql } from "react-apollo";

import { addReviewMutation, getCourseQuery } from "../queries/queries";


class AddReview extends Component {
  constructor(props) {
    super(props);
      this.state=  {
        username: "",
        review: ""
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value} );
  }

  submitForm(e) {
    e.preventDefault();
    const { username, review } = this.state;
    const courseId = this.props.courseId;
    this.props.addReviewMutation({
      variables: { username, review, courseId },
      refetchQueries: [{ query: getCourseQuery }]
    });
  }

  render() {
    return (
      <form id="add-review" onSubmit={this.submitForm.bind(this)}>
        <div className="field_review">
          <label className="label">Username:</label>
          <input
            className="review_input"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
        </div>

        <div className="field_review">
          <label className="label">Review:</label>
          <br />
          <textarea
            className="review_textarea"
            name="review"
            value={this.state.review}
            onChange={this.onChange} />
        </div>

        <button className="review_button">submit</button>

      </form>
    )
  }
}

export default graphql(addReviewMutation, {name: "addReviewMutation"})(AddReview);