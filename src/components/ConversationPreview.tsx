import * as React from "react";
import { Link } from "react-router-dom";

const ConversationPreview = ({ sent_at, users, content, id }: any) => {
  return (
    <Link to={`/conversations/${id}`}>
      <div className="conversation-container">
        <b>{JSON.stringify(users)}</b>
        <p>{content}</p>
        <p>{sent_at}</p>
      </div>
    </Link>
  );
};

export { ConversationPreview };
