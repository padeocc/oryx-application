import { ensureSuperTokensInit } from '@/app/config/backend';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from 'supertokens-node';
import { withSession } from 'supertokens-node/nextjs';

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse('Authentication required', { status: 401 });
    }
    let userInfo = await getUser(session.getUserId());

    return NextResponse.json(userInfo);
  });
}
