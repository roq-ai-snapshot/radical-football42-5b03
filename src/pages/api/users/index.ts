import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandlerMiddleware } from 'server/middlewares';
import { getServerSession } from '@roq/nextjs';
import { roqClient } from '../../../server/roq';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUsers() {
    /*const session = getServerSession(req, res);
    const { users } = await roqClient.asUser(session.roqUserId).users({});*/
    const { users } = await roqClient.asSuperAdmin().users({});
    return res.status(200).json(users.data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
