import React, { Component } from 'react'

import AddCourse from "./AddCourse";
import AddAuthor from "./AddAuthor";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      courseIsActive: "",
      authorIsActive: ""
    }
  }


  showAddCourse() {
    this.setState({ selected: "addCourse", courseIsActive: "active", authorIsActive: ""});
  }
  showAddAuthor() {
    this.setState({ selected: "addAuthor", courseIsActive: "", authorIsActive: "active"});
  }

  displayComponent() {
    const { selected } = this.state;
    return selected === "addCourse" ? (<AddCourse />) : selected === "addAuthor" ? (<AddAuthor />) : "";
  }
  render() {
    return (
      <div className="form_container">
        <div className="nav">
          <ul>
            <li className={`nav_item ${this.state.courseIsActive}`} onClick={this.showAddCourse.bind(this)}>Add Course</li>
            <li className={`nav_item ${this.state.authorIsActive}`} onClick={this.showAddAuthor.bind(this)} >Add Author</li>
          </ul>
        </div>
        {this.displayComponent()}
      </div>
    )
  }
}

export default Add;