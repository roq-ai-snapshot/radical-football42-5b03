import { PaymentInterface } from 'interfaces/payment';
import { AcademyInterface } from 'interfaces/academy';

export interface SubscriptionPlanInterface {
  id?: string;
  academy_id: string;
  name: string;
  price: number;
  duration: number;
  payment?: PaymentInterface[];
  academy?: AcademyInterface;
  _count?: {
    payment?: number;
  };
}
