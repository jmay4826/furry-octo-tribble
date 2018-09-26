import * as React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { IConversation } from "./Conversations";

interface IProps extends IConversation {
  selected?: boolean;
  content?: string;
}

const ConversationPreview = ({
  sent_at,
  users,
  id,
  content = "",
  selected = false
}: IProps) => {
  return (
    <Link to={`/conversations/${id}`}>
      <div className={`conversation-preview ${selected && "selected"}`}>
        <p className="conversation-preview-users">
          {users.reduce(
            (acc, user, i, arr) =>
              i !== arr.length - 1 ? `${acc} ${user},` : `${acc} ${user}`,
            ""
          )}
        </p>
        <p className="conversation-preview-content">
          {content ? content.substring(0, 50) + "..." : "No messages yet"}
        </p>
        <p className="conversation-preview-content">
          <TimeAgo date={sent_at} />
        </p>
      </div>
    </Link>
  );
};

export { ConversationPreview };
