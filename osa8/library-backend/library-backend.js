const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!,
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  },
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  },
  type Author {
    name: String!,
    bookCount: Int,
    born: Int
    id: ID!
  },
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({})
      } else if (!args.author) {
        return await Book.find( { genre: { $in: [args.genre] } } )
      } else if (!args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author._id })
      } else {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author._id })
        return books.filter(book => book.genres.includes(args.genre))
      }
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async root => {
      const bookCount = await Book.find({ author: root._id })
      return bookCount.length
    }
  },
  Book: {
    author: async root => {
      const author = await Author.findOne({ _id: root.author })
      return {
        name: author.name,
        born: author.born,
        id: author.id
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = new Author({
        name: args.author,
        born: null
      })
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      })
      try {
        await book.save()
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ author: args.name})

      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})