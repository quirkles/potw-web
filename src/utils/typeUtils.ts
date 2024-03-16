export type Empty<T extends null | undefined | void = null> = T;

export type Maybe<Thing, EmptyType extends Empty = Empty>  = Thing | Empty;

export type PartialNull<T> = {
    [P in keyof T]: Maybe<T[P]>;
};