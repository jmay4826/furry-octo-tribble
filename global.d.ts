interface IConversation {
  id: number;
  sent_at: string;
  users: string[];
}

interface IMessage {
  content: string;
  from_username: string;
  message_id: number;
  sent_at: string;
  users: string[];
}

interface ISection {
  students: Array<{
    user_id: number;
    username: string;
  }>;
  section_id: number;
  name: string;
  user_id: number;
  username: string;
  role: string;
}

declare module "react-timeago";
