import { ExerciseInterface } from 'interfaces/exercise';
import { PlayerTrainingPlanInterface } from 'interfaces/player-training-plan';
import { AcademyInterface } from 'interfaces/academy';

export interface TrainingPlanInterface {
  id?: string;
  academy_id: string;
  title: string;
  description?: string;
  exercise?: ExerciseInterface[];
  player_training_plan?: PlayerTrainingPlanInterface[];
  academy?: AcademyInterface;
  _count?: {
    exercise?: number;
    player_training_plan?: number;
  };
}
