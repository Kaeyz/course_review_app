import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { getCourseQuery } from "../queries/queries";

import AddReview from "./AddReview";


class CourseDetails extends Component {
  displayCourseDetails(){
    const { course } = this.props.data;
    if (course) {
      return (
        <div>
          <h2>{course.title}</h2>
          <h5>{course.category}</h5>
          <p>{course.description}</p>
          <p>{course.author.name}</p>
          <p>All courses by {course.author.name}</p>
          <ul className="other-courses">
            {course.author.courses.map(item => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
          <p>Reviews</p>
          <ul className="reviews">
            {course.reviews.map(review => (
              <li key={review.id} className="review">
                <p className="comment">{review.review}</p>
                <span className="username">{review.username}</span>
              </li>
            ))}
          </ul>
          <p>What do you think of this course?</p>
          <AddReview courseId={course.id}/>
        </div>
      )
    } else {
      return (
        <div>No Course Selected</div>
      )
    }
  }
  render() {
    return (
      <div id="course-details">
        {this.displayCourseDetails()}
      </div>
    )
  }
}
export default graphql(getCourseQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.courseId
      }
    }
  }
})(CourseDetails);