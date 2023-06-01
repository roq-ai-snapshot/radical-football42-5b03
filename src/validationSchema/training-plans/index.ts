import * as yup from 'yup';
import { exerciseValidationSchema } from 'validationSchema/exercises';
import { playerTrainingPlanValidationSchema } from 'validationSchema/player-training-plans';

export const trainingPlanValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  academy_id: yup.string().nullable().required(),
  exercise: yup.array().of(exerciseValidationSchema),
  player_training_plan: yup.array().of(playerTrainingPlanValidationSchema),
});
