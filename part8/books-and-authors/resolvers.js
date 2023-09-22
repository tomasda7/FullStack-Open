const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const jwt = require('jsonwebtoken');

require('dotenv').config();

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        const byGenreFilter = await Book.find({ genres: args.genre }).populate(
          'author',
          { name: 1 }
        );

        return byGenreFilter;
      }

      return Book.find({}).populate('author', { name: 1 });
    },
    allAuthors: async () => {
      console.log('Author.find');
      const authorsDb = await Author.find({});

      const booksDb = await Book.find({}).populate('author', { name: 1 });

      const authorsToFrontend = authorsDb.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: booksDb.filter((book) => book.author.name === author.name)
            .length,
        };
      });

      return authorsToFrontend;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Invalid token or not authenticated user', {
          extensions: {
            code: 'UNAUTHORIZED_USER',
          },
        });
      }

      try {
        const existingAuthor = await Author.findOne({ name: args.author });

        let book = null;

        if (!existingAuthor) {
          const newAuthor = new Author({ name: args.author });

          book = new Book({
            ...args,
            author: await newAuthor.save(),
          });

          pubsub.publish('BOOK_ADDED', { bookAdded: book });

          return book.save();
        }

        book = new Book({
          ...args,
          author: existingAuthor,
        });

        pubsub.publish('BOOK_ADDED', { bookAdded: book });

        return book.save();
      } catch (error) {
        throw new GraphQLError('Adding a new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Invalid token or not authenticated user', {
          extensions: {
            code: 'UNAUTHORIZED_USER',
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
        throw new GraphQLError('Creating a new user failed', {
          extensions: {
            code: 'INVALID_USER_INPUT',
            invalidArgs: args,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secretpass') {
        throw new GraphQLError('Creating a new user failed', {
          extensions: {
            code: 'INVALID_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
