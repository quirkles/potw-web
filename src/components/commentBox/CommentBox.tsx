import { useState } from "react";
import { styled } from "styled-components";

import { getColor } from "@/app/styles/colors";
import { PotwComment } from "@/firestore/PotwComment";

import { useAppSelector } from "@/app/store/hooks";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { selectUserBySqlId } from "@/app/store/selectors/users";

import {
  ResourcePathString,
  useComments,
} from "@/components/commentBox/useComments";
import { getCommentArray } from "@/components/commentBox/utils";

interface CommentBoxProps {
  resourcePath: ResourcePathString;
}

const StyledCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea {
    color: ${getColor("black")};
    background-color: white;
  }
`;

export default function CommentBox({ resourcePath }: CommentBoxProps) {
  const authUser = useAppSelector(authUserSelector);

  const [commentsState, actions] = useComments(resourcePath);
  const { createComment } = actions;

  const [commentBody, setCommentBody] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const doCreateComment = () => {
    if (!authUser?.firestoreId || !authUser?.sqlId) {
      return;
    }
    createComment({
      title: commentTitle,
      content: commentBody,
      taggedUserFirestoreIds: [],
      replyCommentFirestoreIds: [],
      authorFirestoreId: authUser.firestoreId,
      authorSqlId: authUser.sqlId,
    });
    setCommentBody("");
    setCommentTitle("");
  };
  return (
    <StyledCommentBox>
      <h1>CommentBox</h1>
      {getCommentArray(commentsState.comments).map((comment) => (
        <Comment key={comment.firestoreId} comment={comment} />
      ))}
      <input
        type="text"
        value={commentTitle}
        onChange={(e) => setCommentTitle(e.target.value)}
      />
      <textarea
        name="new-comment"
        cols={30}
        rows={5}
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
      ></textarea>
      <button onClick={doCreateComment}>Add Comment</button>
    </StyledCommentBox>
  );
}

const StyledComment = styled.div``;

function Comment({ comment }: { comment: PotwComment }) {
  const author = useAppSelector((state) =>
    selectUserBySqlId(state, comment.authorSqlId),
  );
  return (
    <StyledComment>
      {comment.title && <h2>{comment.title}</h2>}
      <p>{comment.content}</p>
      <small>Author: {author.username || author.email}</small>
    </StyledComment>
  );
}
