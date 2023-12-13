import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    books: [Book!]!
    drinks: [Drink!]!
    booksByMood(mood: String): [Book]!
  }

  enum Moods {
    cozy
    energetic
    sophisticated
    bright
    youthful
    earthy
  }

  enum Seasons {
    all
    summer
    fall
    winter
    spring
  }

  enum Genre {
    horror
    action
  }

  enum DrinkType {
    coffee
    tea
    other
  }

  type Book {
    id: String!
    title: String!
    author: String!
    image: String
    description: String!
    genre: [Genre!]!
    season: [Seasons!]!
    mood: [Moods!]!
  }

  type Drink {
    id: String!
    type: DrinkType!
    name: String!
    season: [Seasons!]!
    mood: [Moods!]!
  }
`;
