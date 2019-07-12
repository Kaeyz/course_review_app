const graphql = require("graphql");
const Course = require("../model/Course");
const Author = require("../model/Author");
const Review = require("../model/Review");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// courses
const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ courseId: parent.id });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return Course.find({authorId: parent.id })
      }
    }
  })
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    review: { type: GraphQLString },
    course: {
      type: CourseType,
      resolve(parent, args) {
        return Review.findById(parent.courseId);
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    course: {
      type: CourseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Course.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return Course.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    },
    review: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addCourse: {
      type: CourseType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        category: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        const course = new Course({
          title: args.title,
          category: args.category,
          description: args.description,
          authorId: args.authorId
        });
        return course.save();
      }
    },
    addReview: {
      type: ReviewType,
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        review: {type: new GraphQLNonNull(GraphQLString)},
        courseId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        const review = new Review({
          username: args.username,
          review: args.review,
          courseId: args.courseId
        });
        return review.save();
      }
    }
  })
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})