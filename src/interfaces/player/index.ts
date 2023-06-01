import { PlayerTrainingPlanInterface } from 'interfaces/player-training-plan';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  skill_level: number;
  progress: number;
  player_training_plan?: PlayerTrainingPlanInterface[];
  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {
    player_training_plan?: number;
  };
}
