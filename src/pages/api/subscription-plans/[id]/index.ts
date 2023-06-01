import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { subscriptionPlanValidationSchema } from 'validationSchema/subscription-plans';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  await prisma.subscription_plan
    .withAuthorization({ userId: roqUserId })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSubscriptionPlanById();
    case 'PUT':
      return updateSubscriptionPlanById();
    case 'DELETE':
      return deleteSubscriptionPlanById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSubscriptionPlanById() {
    const data = await prisma.subscription_plan.findFirst(convertQueryToPrismaUtil(req.query, 'subscription_plan'));
    return res.status(200).json(data);
  }

  async function updateSubscriptionPlanById() {
    await subscriptionPlanValidationSchema.validate(req.body);
    const data = await prisma.subscription_plan.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteSubscriptionPlanById() {
    const data = await prisma.subscription_plan.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
