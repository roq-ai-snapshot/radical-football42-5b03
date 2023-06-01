import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { academyValidationSchema } from 'validationSchema/academies';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAcademies();
    case 'POST':
      return createAcademy();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAcademies() {
    const data = await prisma.academy
      .withAuthorization({
        userId: roqUserId,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'academy'));
    return res.status(200).json(data);
  }

  async function createAcademy() {
    await academyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.event?.length > 0) {
      const create_event = body.event;
      body.event = {
        create: create_event,
      };
    } else {
      delete body.event;
    }
    if (body?.player?.length > 0) {
      const create_player = body.player;
      body.player = {
        create: create_player,
      };
    } else {
      delete body.player;
    }
    if (body?.subscription_plan?.length > 0) {
      const create_subscription_plan = body.subscription_plan;
      body.subscription_plan = {
        create: create_subscription_plan,
      };
    } else {
      delete body.subscription_plan;
    }
    if (body?.training_plan?.length > 0) {
      const create_training_plan = body.training_plan;
      body.training_plan = {
        create: create_training_plan,
      };
    } else {
      delete body.training_plan;
    }
    const data = await prisma.academy.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
