import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    books: [Book]
    drinks: [Drink]
  }

  enum Vibes {
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
    genre: [Genre]
    season: [Seasons]
    vibe: [Vibes]
  }

  type Drink {
    id: String!
    type: DrinkType!
    name: String!
    season: [Seasons]
    vibe: [Vibes]
  }
`;