import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    books: [Book!]!
    drinks: [Drink!]!
    booksByMood(mood: String): [Book]!
    booksBySubject(subject: String): Subject
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

  type Author {
    key: String
    name: String
  }

  type Availability {
    status: String
    error_message: String
    identifier: String
    is_restricted: Boolean
    is_browseable: Boolean
  }

  type Works {
    key: String
    title: String
    edition_count: Int
    cover_id: Int
    cover_edition_key: String
    subject: [String]
    ia_collection: [String]
    lendinglibrary: Boolean
    printdisabled: Boolean
    lending_edition: String
    lending_identifier: String
    authors: [Author]
    first_publish_year: Int
    ia: String
    public_scan: Boolean
    has_fulltext: Boolean
    availability: Availability
  }

  type Subject {
    key: String
    name: String
    subject_type: String
    work_count: Int
    works: [Works]
  }
`;
