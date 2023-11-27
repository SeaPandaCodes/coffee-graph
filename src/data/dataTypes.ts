type Vibes =
  | "cozy"
  | "energetic"
  | "sophisticated"
  | "bright"
  | "youthful"
  | "earthy";

type Seasons = "all" | "summer" | "fall" | "winter" | "spring";

type Genre = "horror" | "action";

export type Drink = {
  id: string;
  type: "coffee" | "tea" | "other";
  name: string;
  season: Array<Seasons>;
  vibe: Array<Vibes>;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  genre: Array<Genre>;
  season: Array<Seasons>;
  vibe: Array<Vibes>;
};
