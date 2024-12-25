import { A, D, pipe } from "@mobily/ts-belt";
import { TFirebaseComment } from "@potw/schemas";
import deepmerge from "deepmerge";

export const actionCreators = {
  addComments: (comments: TFirebaseComment[]) => ({
    type: "ADD_COMMENTS",
    payload: comments,
  }),
  addComment: (comment: TFirebaseComment) => ({
    type: "ADD_COMMENT",
    payload: comment,
  }),
} as const;

export type UseCommentsReducerActionPayload = ReturnType<
  (typeof actionCreators)[keyof typeof actionCreators]
>;

export interface UseCommentsReducerState {
  comments: {
    [commentId: string]: TFirebaseComment;
  };
  newComment: Partial<Omit<TFirebaseComment, "id">>;
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
