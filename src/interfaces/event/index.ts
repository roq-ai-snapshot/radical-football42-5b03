import { AcademyInterface } from 'interfaces/academy';

export interface EventInterface {
  id?: string;
  academy_id: string;
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;

  academy?: AcademyInterface;
  _count?: {};
}
