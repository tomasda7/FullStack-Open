const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("error connection to MondoDB: ", error.message);
  });

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBorn: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        const byGenreFilter = await Book.find({ genres: args.genre }).populate(
          "author",
          { name: 1 }
        );

        return byGenreFilter;
      }

      return Book.find({}).populate("author", { name: 1 });
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: async (root, args, context) => {
      try {
        return context.currentUser;
      } catch (error) {
        throw new GraphQLError("Invalid token or not authenticated user", {
          extensions: {
            code: "UNAUTHORIZED_USER",
          },
        });
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new GraphQLError("Invalid token or not authenticated user", {
            extensions: {
              code: "UNAUTHORIZED_USER",
            },
          });
        }
        const existingAuthor = await Author.findOne({ name: args.author });

        let book = null;

        if (!existingAuthor) {
          const newAuthor = new Author({ name: args.author });

          book = new Book({
            ...args,
            author: await newAuthor.save(),
          });

          return book.save();
        }

        book = new Book({
          ...args,
          author: existingAuthor,
        });

        return book.save();
      } catch (error) {
        throw new GraphQLError("Adding a new book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Invalid token or not authenticated user", {
          extensions: {
            code: "UNAUTHORIZED_USER",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      author.born = args.setBorn;

      return author.save();
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ ...args });

        return user.save();
      } catch (error) {
        throw new GraphQLError("Creating a new user failed", {
          extensions: {
            code: "INVALID_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secretpass") {
        throw new GraphQLError("Creating a new user failed", {
          extensions: {
            code: "INVALID_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: args.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
