import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { playerTrainingPlanValidationSchema } from 'validationSchema/player-training-plans';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  await prisma.player_training_plan
    .withAuthorization({ userId: roqUserId })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPlayerTrainingPlanById();
    case 'PUT':
      return updatePlayerTrainingPlanById();
    case 'DELETE':
      return deletePlayerTrainingPlanById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlayerTrainingPlanById() {
    const data = await prisma.player_training_plan.findFirst(
      convertQueryToPrismaUtil(req.query, 'player_training_plan'),
    );
    return res.status(200).json(data);
  }

  async function updatePlayerTrainingPlanById() {
    await playerTrainingPlanValidationSchema.validate(req.body);
    const data = await prisma.player_training_plan.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePlayerTrainingPlanById() {
    const data = await prisma.player_training_plan.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
