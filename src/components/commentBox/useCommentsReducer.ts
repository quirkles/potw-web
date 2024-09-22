import { A, D, pipe } from "@mobily/ts-belt";
import deepmerge from "deepmerge";

import { PotwComment } from "@/firestore/PotwComment";

export const actionCreators = {
  addComments: (comments: PotwComment[]) => ({
    type: "ADD_COMMENTS",
    payload: comments,
  }),
  addComment: (comment: PotwComment) => ({
    type: "ADD_COMMENT",
    payload: comment,
  }),
} as const;

export type UseCommentsReducerActionPayload = ReturnType<
  (typeof actionCreators)[keyof typeof actionCreators]
>;

export interface UseCommentsReducerState {
  comments: {
    [commentId: string]: PotwComment;
  };
  newComment: Partial<Omit<PotwComment, "id">>;
}
export function useCommentsReducer(
  state: UseCommentsReducerState,
  action: UseCommentsReducerActionPayload,
): UseCommentsReducerState {
  switch (action.type) {
    case "ADD_COMMENTS":
      return pipe(
        (action as ReturnType<typeof actionCreators.addComments>).payload,
        A.map((comment) => [comment.firestoreId, comment] as const),
        D.fromPairs,
        (comments) => ({ comments }),
        (newComments) => deepmerge(newComments, state),
      ) as UseCommentsReducerState;
    case "ADD_COMMENT":
      return deepmerge(state, {
        comments: {
          [(action as ReturnType<typeof actionCreators.addComment>).payload
            .firestoreId]: (
            action as ReturnType<typeof actionCreators.addComment>
          ).payload,
        },
      }) as UseCommentsReducerState;
    default:
      return state;
  }
}
