import { default as z } from "zod";

type Collections = {
  [collectionName: string]: Collection;
};

type Collection = {
  collections?: Collections;
};

const COLLECTIONS: Collections = {
  user: {},
  game: {
    collections: {
      messages: {},
    },
  },
};
