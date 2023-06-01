import * as yup from 'yup';

export const paymentValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  payment_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  subscription_plan_id: yup.string().nullable().required(),
});
