import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOKS_BYGENRE = gql`
  query byGenre($selectedGenre: String) {
    allBooks(genre: $selectedGenre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const USER_INFO = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const SET_BIRTHYEAR = gql`
  mutation setBirthyear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBorn: $year) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
