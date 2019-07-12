import React, { Component } from 'react'
import { graphql } from "react-apollo";

import { getCoursesQuery } from "../queries/queries";
import CourseDetails from './CourseDetails';



class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  displayCourses() {
    const { data } = this.props;
    if (data.loading) {
      return(<div>Loading Courses......</div>)
    } else if (!data.loading && data.courses.length === 0) {
      return(<div>No course found</div>)
    } else {
      return data.courses.map(course => (
        <li key={course.id} onClick={(e) => { this.setState({ selected: course.id })}}>{course.title}</li>
      ))
    }
  }

  render() {
     return (
       <div>
         <ul id="course-list">
           {this.displayCourses()}
         </ul>
         <CourseDetails courseId={this.state.selected}/>
       </div>
     )
   }
 }

export default graphql(getCoursesQuery)(CourseList);