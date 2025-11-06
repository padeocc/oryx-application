import { withSession } from 'supertokens-node/nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { ensureSuperTokensInit } from '../../config/backend';
import { Favorite } from '@/db/entities/Favorite';
import { getDBConnection } from '@/db/connection';

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse('Authentication required', { status: 401 });
    }
    const searchParams = request.nextUrl.searchParams;

    const dataSource = await getDBConnection();
    const favoriteRepository = dataSource.getRepository(Favorite);
    const favorites = await favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.user', 'user')
      .orderBy('user')
      .getMany();
    if (!favorites) {
      return new NextResponse('Not found', { status: 404 });
    }
    return NextResponse.json({
      favorites: favorites
    });
  });
}
export async function POST(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse('Authentication required', { status: 401 });
    }
    const { userId, serviceCode } = await request.json();
    try {
      const dataSource = await getDBConnection();

      const favorite = new Favorite();
      favorite.user = userId;
      favorite.serviceCode = serviceCode;

      const favoriteRepository = dataSource.getRepository(Favorite);
      await favoriteRepository.save(favorite);
      console.log('Favorite has been saved. Favorite id is', favorite);
      return NextResponse.json(favorite);
    } catch (error) {
      console.error(error);
    }
    return Response.json({ nothing: true });
  });
}
export async function DELETE(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse('Authentication required', { status: 401 });
    }
    try {
      const { userId, serviceCode } = await request.json();
      const dataSource = await getDBConnection();

      const favoriteRepository = dataSource.getRepository(Favorite);
      const favoriteToRemove = await favoriteRepository.findOneBy({
        user: userId,
        serviceCode: serviceCode
      });
      await favoriteRepository.remove(favoriteToRemove!);
      console.log('Favorite has been removed.');
    } catch (error) {
      console.error(error);
    }
    return Response.json({ nothing: true });
  });
}
