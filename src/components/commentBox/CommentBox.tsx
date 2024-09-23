import { useState } from "react";
import { styled } from "styled-components";

import { getColor } from "@/app/styles/colors";
import { PotwComment } from "@/firestore/PotwComment";

import { useAppSelector } from "@/app/store/hooks";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { selectUserBySqlId } from "@/app/store/selectors/users";

import { Avatar } from "@/components/avatar/Avatar";
import Button from "@/components/button/Button";
import { Colors } from "@/components/colors/Colors";
import {
  ResourcePathString,
  useComments,
} from "@/components/commentBox/useComments";
import { getCommentArray } from "@/components/commentBox/utils";
import VerticalDivider from "@/components/divider/VerticalDivider";
import MultiBubble from "@/components/icons/MultiBubble.svg";
import { FlexContainer } from "@/components/layout/FlexContainer";
import { Small } from "@/components/text/Small";

import { formatDateTime } from "@/utils/date";

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
  const doCreateComment = () => {
    if (!authUser?.firestoreId || !authUser?.sqlId) {
      return;
    }
    createComment({
      content: commentBody,
      taggedUserFirestoreIds: [],
      replyCommentFirestoreIds: [],
      authorFirestoreId: authUser.firestoreId,
      authorSqlId: authUser.sqlId,
    });
    setCommentBody("");
  };
  return (
    <StyledCommentBox>
      <textarea
        name="new-comment"
        cols={30}
        rows={5}
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Say something..."
      ></textarea>
      <Button
        buttonText="Add comment"
        onClick={doCreateComment}
        color="green"
        Icon={MultiBubble}
      ></Button>
      <FlexContainer $direction="column" $gap="small" $alignItems="stretch">
        {getCommentArray(commentsState.comments).map((comment) => (
          <Comment key={comment.firestoreId} comment={comment} />
        ))}
      </FlexContainer>
    </StyledCommentBox>
  );
}

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5rem;
  background-color: ${getColor("green_100")};
`;

function Comment({ comment }: { comment: PotwComment }) {
  const author = useAppSelector((state) =>
    selectUserBySqlId(state, comment.authorSqlId),
  );
  if (!author.sqlId) {
    return null;
  }
  return (
    <StyledComment>
      <FlexContainer $alignItems="flex-end" $gap="small">
        <Avatar url={author.avatarUrl} value={author.sqlId} size="xSmall" />
        <Small $color="grey" $fontSize="sm">
          {author.username || author.email}
        </Small>
      </FlexContainer>
      <Colors $backgroundColor="white">
        <FlexContainer $gap="small" $alignItems="stretch">
          <VerticalDivider $width="large" $color="green" />
          <FlexContainer $direction="column">
            {comment.title && <h2>{comment.title}</h2>}
            <p>{comment.content}</p>
          </FlexContainer>
        </FlexContainer>
      </Colors>
      <Small $color="lightGrey_200" $fontSize="xs" $fontStyle="italic">
        {formatDateTime(comment.createdAt, "timeShortMonthDay")}
      </Small>
    </StyledComment>
  );
}
