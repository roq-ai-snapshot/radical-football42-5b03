import { UserInterface } from 'interfaces/user';

export interface MessageInterface {
  id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  sent_at: Date;

  user_message_sender_idTouser?: UserInterface;
  user_message_receiver_idTouser?: UserInterface;
  _count?: {};
}
