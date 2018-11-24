import * as React from "react";
import Link from "next/link";
import TimeAgo from "react-timeago";
import { CardStyles } from "../styles/CardStyles";

interface IProps extends IConversation {
  selected?: boolean;
}

const defaultMessage = { content: "No messages yet!", sent_at: undefined };
const formatUsers = (
  acc: string,
  user: IConversationUser,
  i: number,
  arr: [IConversationUser]
) =>
  i !== arr.length - 1
    ? `${acc} ${user.user.first_name},`
    : `${acc} ${user.user.first_name}`;

const ConversationPreview = (props: IProps) => {
  const { user_conversations, messages, id, selected = false, ...rest } = props;
  const previewMessage = messages[0] || defaultMessage;
  return (
    <Link href={{ pathname: "/conversations", query: { conversation_id: id } }}>
      <div className={`card ${selected && "selected"}`} {...rest}>
        <p className="card-header">
          {user_conversations.reduce(formatUsers, "")}
        </p>
        <p className="card-content">
          {previewMessage.content.length < 50
            ? previewMessage.content
            : previewMessage.content.substring(0, 50) + "..."}
        </p>
        <p className="card-content">
          {previewMessage.sent_at && <TimeAgo date={previewMessage.sent_at} />}
        </p>
        <style jsx>{CardStyles}</style>
      </div>
    </Link>
  );
};

export { ConversationPreview };
