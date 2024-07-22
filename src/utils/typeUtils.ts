export type Empty<T extends null | undefined | void = null> = T;

export type Maybe<Thing, EmptyType extends Empty = Empty> = Thing | Empty;

export type PartialNull<T> = {
  [P in keyof T]: Maybe<T[P]>;
};

export type RecordToEnum<
  T extends Record<
    string | number | symbol,
    string | number | symbol | boolean
  >,
> = T[keyof T];
