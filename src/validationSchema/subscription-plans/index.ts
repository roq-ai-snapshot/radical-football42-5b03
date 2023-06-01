import * as yup from 'yup';
import { paymentValidationSchema } from 'validationSchema/payments';

export const subscriptionPlanValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  duration: yup.number().integer().required(),
  academy_id: yup.string().nullable().required(),
  payment: yup.array().of(paymentValidationSchema),
});
