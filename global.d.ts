interface IDecodedUser {
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "instructor";
  id: number;
}

interface IPrivateUser {
  id: number;
  first_name: string;
  // TODO: allow a display_name, default to first_name
  // display_name: string;
}

interface IStandardUser extends IPrivateUser {
  last_name: string;
  email: string;
  role: "student" | "instructor";
  user_sections: [{ section: { id: number; description: string } }];
}

interface IConversationUser {
  user: IPrivateUser;
}

interface IConversation {
  id: number;
  messages: [IMessage?];
  user_conversations: [IConversationUser];
}

interface IMessage {
  id: number;
  content: string;
  sent_at: string;
  from: IPrivateUser;
  conversation: {
    user_conversations: [IConversationUser];
  };
}

interface ISection {
  students: Array<{
    user_id: number;
    first_name: string;
    last_name: string;
    conversation_count: string;
    message_count: string;
  }>;
  instructors: Array<{
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
declare module "react-lazy-hero";
