import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { getServerSession } from '@roq/nextjs';
import { roqClient } from 'server/roq';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUserById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUserById() {
    /*
    const session = getServerSession(req, res);
    const { user: roqUser } = await roqClient
      .asUser(session.roqUserId)
      .user({ id: req.query.id as string });*/
    const { user: roqUser } = await roqClient.asSuperAdmin().user({ id: req.query.id as string });
    const {
      roles: { data: roles },
    } = await roqClient.asSuperAdmin().roles();
    const body = {
      where: {
        roq_user_id: req.query.id as string,
      },
      include: {},
    };

    if (Object.keys(body.include).length === 0) {
      delete body.include;
    }
    const user = await prisma.user.findFirst(body);
    return res.status(200).json({
      ...roqUser,
      ...user,
    });
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
