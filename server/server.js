const dotenv      = require("dotenv");
const express     = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose    = require("mongoose");
const cors        = require("cors");

dotenv.config();
const { DATABASE: db, PORT: port } = process.env;

const app = express();

const schema = require("./schema/schema");

app.use(cors());

mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("DB connected");
});


app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})