interface IDecodedUser {
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "instructor";
  id: number;
}

interface IConversation {
  id: number;
  sent_at: string;
  users: string[];
}

interface IMessage {
  content: string;
  from_id: number;
  from_username: string;
  message_id: number;
  sent_at: string;
  users: string[];
}

interface ISection {
  students: Array<{
    user_id: number;
    first_name: string;
    last_name: string;
    conversation_count: string;
    message_count: string;
  }>;
  section_id: string;
  user_id: number;
  username: string;
  role: string;
}

declare module "react-timeago";
