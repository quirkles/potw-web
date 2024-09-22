import {
  collection,
  limit,
  orderBy,
  query,
  onSnapshot,
  doc,
  setDoc,
} from "@firebase/firestore";
import { useEffect, useReducer } from "react";

import { getAppFirestore } from "@/firebase";
import { potwCommentSchema, PotwComment } from "@/firestore/PotwComment";

import {
  actionCreators,
  useCommentsReducer,
  UseCommentsReducerState,
} from "@/components/commentBox/useCommentsReducer";

import keyMirror from "@/utils/object";
import { PartialBy } from "@/utils/typeUtils";

const entities = ["games"] as const;

export const entityMap = keyMirror(entities);

export type Entity = keyof typeof entityMap;

export type ResourcePathString = `${Entity}/${string}`;

const initialState: UseCommentsReducerState = {
  comments: {},
  newComment: {},
};

type CreateCommentPayload = PartialBy<
  Pick<
    PotwComment,
    | "title"
    | "content"
    | "parentCommentFirestoreId"
    | "replyCommentFirestoreIds"
    | "taggedUserFirestoreIds"
    | "authorFirestoreId"
    | "authorSqlId"
  >,
  | "title"
  | "parentCommentFirestoreId"
  | "replyCommentFirestoreIds"
  | "taggedUserFirestoreIds"
>;

export function useComments(resourcePath: ResourcePathString): [
  UseCommentsReducerState,
  {
    createComment: (comment: CreateCommentPayload) => void;
  },
] {
  const [state, dispatch] = useReducer(
    useCommentsReducer,
    Object.assign({}, initialState),
  );
  useEffect(() => {
    const query = getCollectionQueryFromPath(resourcePath);
    const unsubscribe = onSnapshot(query, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const parseResult = potwCommentSchema.safeParse(data);
        if (parseResult.success) {
          dispatch(actionCreators.addComment(parseResult.data));
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [resourcePath]);
  function createComment(comment: CreateCommentPayload) {
    return addComment(comment, resourcePath);
  }

  return [
    state,
    {
      createComment,
    },
  ];
}

function getCollectionQueryFromPath(path: ResourcePathString) {
  const db = getAppFirestore();
  return query(
    collection(db, path, "comments"),
    orderBy("createdAt"),
    limit(50),
  );
}

function addComment(comment: CreateCommentPayload, path: ResourcePathString) {
  const db = getAppFirestore();
  const newCommentRef = doc(collection(db, path, "comments"));
  let nowString = new Date().toISOString();
  const newComment: PotwComment = {
    firestoreId: newCommentRef.id,
    createdAt: nowString,
    updatedAt: nowString,
    taggedUserFirestoreIds: [],
    replyCommentFirestoreIds: [],
    parentCommentFirestoreId: null,
    title: null,
    ...comment,
  };
  return setDoc(newCommentRef, potwCommentSchema.parse(newComment));
}
