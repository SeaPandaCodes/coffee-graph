export type Moods =
  | "cozy"
  | "energetic"
  | "sophisticated"
  | "bright"
  | "youthful"
  | "earthy";

export type Seasons = "all" | "summer" | "fall" | "winter" | "spring";

export type Genre = "horror" | "action";

export type Drink = {
  id: string;
  type: "coffee" | "tea" | "other";
  name: string;
  season: Array<Seasons>;
  mood: Array<Moods>;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  genre: Array<Genre>;
  season: Array<Seasons>;
  mood: Array<Moods>;
};

export type Mood = {
  id: string;
  item_id: string;
  type: "book" | "drink";
  mood: string;
};
