import { expect, describe, it } from "@jest/globals";

import {
  actionCreators,
  useCommentsReducer,
  UseCommentsReducerState,
} from "@/components/commentBox/useCommentsReducer";

const toISOString = new Date().toISOString();

const getFakeComment = (firestoreId: string) => ({
  firestoreId,
  title: `Comment ${firestoreId}`,
  content: `Content ${firestoreId}`,
  taggedUserFirestoreIds: [],
  createdAt: toISOString,
  updatedAt: toISOString,
  authorSqlId: "sql",
  authorFirestoreId: "fb",
  replyCommentFirestoreIds: [],
  parentCommentFirestoreId: "parent",
});

describe("useCommentsReducer", () => {
  // Adds multiple comments to the state correctly
  it("should add multiple comments to the state correctly when action type is ADD_COMMENTS", () => {
    const initialState = {
      comments: {},
      newComment: {},
    };

    const comments = [getFakeComment("1"), getFakeComment("2")];

    const action = actionCreators.addComments(comments);

    const newState = useCommentsReducer(initialState, action);

    expect(newState).toEqual({
      comments: {
        "1": comments[0],
        "2": comments[1],
      },
      newComment: {},
    });
  });

  // Handles action with no comments in payload
  it("should return the same state when action type is ADD_COMMENTS with an empty payload", () => {
    const initialState = {
      comments: {},
      newComment: {},
    };

    const action = {
      type: "ADD_COMMENTS",
      payload: [],
    };

    const newState = useCommentsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  // Merges new comments with existing state without overwriting
  it("should merge new comments with existing state correctly when action type is ADD_COMMENTS", () => {
    const initialState: UseCommentsReducerState = {
      comments: {
        "1": getFakeComment("1"),
      },
      newComment: {},
    };

    const comments = [getFakeComment("2")];

    const action = {
      type: "ADD_COMMENTS",
      payload: comments,
    };

    const newState = useCommentsReducer(initialState, action);

    expect(newState).toEqual({
      comments: {
        "1": {
          content: "Content 1",
          createdAt: toISOString,
          firestoreId: "1",
          taggedUserFirestoreIds: [],
          title: "Comment 1",
          updatedAt: toISOString,
        },
        "2": {
          content: "Content 2",
          createdAt: toISOString,
          firestoreId: "2",
          taggedUserFirestoreIds: [],
          title: "Comment 2",
          updatedAt: toISOString,
        },
      },
      newComment: {},
    });
  });

  // Maintains state immutability
  it("should maintain state immutability when action type is not ADD_COMMENTS", () => {
    const initialState = {
      comments: {
        "1": getFakeComment("1"),
      },
      newComment: {},
    };

    const action = {
      type: "SOME_OTHER_ACTION",
      payload: [],
    };

    const newState = useCommentsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it("should return the current state when action type is not recognized", () => {
    const initialState = {
      comments: {},
      newComment: {},
    };

    const action = {
      type: "UNKNOWN_ACTION_TYPE",
      payload: [],
    };

    const newState = useCommentsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
