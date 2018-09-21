import * as React from "react";
import { Link } from "react-router-dom";

const ConversationPreview = ({ sent_at, users, content, id }: any) => {
  return (
    <Link className="conversation-preview" to={`/conversations/${id}`}>
      {users.map((user: string) => (
        <span className="conversation-users" key={user}>
          {user}
        </span>
      ))}
      <p>{content}</p>
      <p>Last Message: {new Date(sent_at).toLocaleString()}</p>
    </Link>
  );
};

export { ConversationPreview };
