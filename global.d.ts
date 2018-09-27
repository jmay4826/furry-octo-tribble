interface IMessage {
  content: string;
  from_username: string;
  message_id: number;
  sent_at: string;
  users: string[];
}

declare module "react-timeago";
