import { TFirebaseComment } from "@potw/schemas";

import { UseCommentsReducerState } from "@/components/commentBox/useCommentsReducer";

export function getCommentArray(
  commentMap: UseCommentsReducerState["comments"],
): TFirebaseComment[] {
  return Object.values(commentMap).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
