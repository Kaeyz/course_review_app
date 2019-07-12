import React, { Component } from 'react';
import { graphql, compose } from "react-apollo";

import { getAuthorsQuery, addCourseMutation, getCoursesQuery } from "../queries/queries";
import keys from "../keys";


class AddCourse extends Component {
  constructor(props) {
    super(props);
      this.state=  {
        title: "",
        category: "",
        description: "",
        authorId: "",
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
      const { title, category, description, authorId } = this.state;
      this.props.addCourseMutation({
        variables: { title, category, description, authorId },
        refetchQueries: [{query: getCoursesQuery}]
      })
    } else {
      this.setState({ error: "User verification key incorrect" });
    }
  }

  displayAuthors() {
    const data  = this.props.getAuthorsQuery;
    if (data.loading) {
      return(<option disabled>Loading Authors ....</option>)
    } else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>{author.name}</option>
      ));
    }
  }
  render() {
    return (
      <form id="add-course" onSubmit={this.submitForm.bind(this)}>
        <p className="error">{this.state.error}</p>
        <div className="field">
          <label>Course title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
        </div>

        <div className="field">
          <label>Course Category:</label>
          <input
            type="text"
            name="category"
            value={this.state.category}
            onChange={this.onChange} />
        </div>

        <div className="field">
          <label>Course Description:</label>
          <textarea name="description" value={this.state.description} onChange={this.onChange}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={this.onChange} name="authorId">
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
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


export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addCourseMutation, {name: "addCourseMutation"})
)(AddCourse);