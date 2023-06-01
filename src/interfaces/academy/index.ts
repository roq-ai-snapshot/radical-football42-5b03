import { EventInterface } from 'interfaces/event';
import { PlayerInterface } from 'interfaces/player';
import { SubscriptionPlanInterface } from 'interfaces/subscription-plan';
import { TrainingPlanInterface } from 'interfaces/training-plan';
import { UserInterface } from 'interfaces/user';

export interface AcademyInterface {
  id?: string;
  name: string;
  user_id: string;
  event?: EventInterface[];
  player?: PlayerInterface[];
  subscription_plan?: SubscriptionPlanInterface[];
  training_plan?: TrainingPlanInterface[];
  user?: UserInterface;
  _count?: {
    event?: number;
    player?: number;
    subscription_plan?: number;
    training_plan?: number;
  };
}
