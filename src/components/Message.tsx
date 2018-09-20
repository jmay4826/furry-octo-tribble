import * as React from "react";

const Message = ({ to_username, from_username, content, sent_at }: any) => {
  return (
    <div className="message">
      <p>{from_username}</p>
      <p>{to_username}</p>
      <p>{content}</p>
      <p>
        {new Date(sent_at).toLocaleDateString()}{" "}
        {new Date(sent_at).toLocaleTimeString()}
      </p>
      <hr />
    </div>
  );
};

export { Message };
