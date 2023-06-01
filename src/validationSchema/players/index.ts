import * as yup from 'yup';
import { playerTrainingPlanValidationSchema } from 'validationSchema/player-training-plans';

export const playerValidationSchema = yup.object().shape({
  skill_level: yup.number().integer().required(),
  progress: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
  player_training_plan: yup.array().of(playerTrainingPlanValidationSchema),
});
