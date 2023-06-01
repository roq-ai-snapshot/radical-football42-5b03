import * as yup from 'yup';

export const exerciseValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  training_plan_id: yup.string().nullable().required(),
});
