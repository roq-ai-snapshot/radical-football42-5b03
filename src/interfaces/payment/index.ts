import { UserInterface } from 'interfaces/user';
import { SubscriptionPlanInterface } from 'interfaces/subscription-plan';

export interface PaymentInterface {
  id?: string;
  user_id: string;
  subscription_plan_id: string;
  amount: number;
  payment_date: Date;

  user?: UserInterface;
  subscription_plan?: SubscriptionPlanInterface;
  _count?: {};
}
