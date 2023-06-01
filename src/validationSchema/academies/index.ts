import * as yup from 'yup';
import { eventValidationSchema } from 'validationSchema/events';
import { playerValidationSchema } from 'validationSchema/players';
import { subscriptionPlanValidationSchema } from 'validationSchema/subscription-plans';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';

export const academyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  event: yup.array().of(eventValidationSchema),
  player: yup.array().of(playerValidationSchema),
  subscription_plan: yup.array().of(subscriptionPlanValidationSchema),
  training_plan: yup.array().of(trainingPlanValidationSchema),
});
