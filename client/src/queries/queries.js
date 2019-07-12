import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`


const getCoursesQuery = gql`
{
  courses {
    title
    id
  }
}
`

const addCourseMutation = gql`
  mutation($title: String!,$category: String!, $description:String!, $authorId:ID!) {
    addCourse(title:$title, category:$category, description:$description, authorId:$authorId ){
      title
      id
    }
  }
`
const addAuthorMutation = gql`
  mutation($name: String!,$age: Int!) {
    addAuthor(name:$name, age:$age){
      name
      id
    }
  }
`
const addReviewMutation = gql`
  mutation($username: String!,$review: String!, $courseId:ID!) {
    addReview(username:$username, review:$review, courseId:$courseId){
      username
      review
      id
    }
  }
`
const getCourseQuery = gql`
  query($id: ID){
    course(id: $id) {
      id
      title
      category
      description
      reviews{
        username
        review
        id
        }
      author{
        id
        name
        age
        courses{
          title
          id
        }
      }
    }
  }
`

export { getAuthorsQuery, getCoursesQuery, addCourseMutation, getCourseQuery, addAuthorMutation, addReviewMutation };