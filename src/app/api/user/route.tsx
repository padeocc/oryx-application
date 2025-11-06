import { withSession } from 'supertokens-node/nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { ensureSuperTokensInit } from '../../config/backend';
import { getDBConnection } from '@/db/connection';
import { User } from '@/db/entities/User';

ensureSuperTokensInit();

async function getUser(userId: string) {
  const dataSource = await getDBConnection();
  return Promise.resolve(dataSource)
    .then(async () => {
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.find({
        where: {
          uuid: userId
        },
        relations: {
          favorites: true
        }
      });
      return user[0];
    })
    .catch(error => console.log('Error: ', error));
}

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse('Authentication required', { status: 401 });
    }
    const user = await getUser(session.getUserId())
    return NextResponse.json({
      note: 'Fetch any data from your application for authenticated user after using verifySession middleware',
      userId: session.getUserId(),
      sessionHandle: session.getHandle(),
      accessTokenPayload: session.getAccessTokenPayload(),
      user: user
    });
  });
}