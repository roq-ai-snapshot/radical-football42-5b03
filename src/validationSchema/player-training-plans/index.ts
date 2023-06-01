import * as yup from 'yup';

export const playerTrainingPlanValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  player_id: yup.string().nullable().required(),
  training_plan_id: yup.string().nullable().required(),
});
