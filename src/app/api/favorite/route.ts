import { withSession } from 'supertokens-node/nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { ensureSuperTokensInit } from '../../config/backend';
import { Favorite } from '@/db/entities/Favorite';
import { getDBConnection } from '@/db/connection';
import { Service } from '@/types';
import { SearchResponses } from 'algoliasearch';
import { search } from '@/algolia/search';
import { transformServicesFromResults } from '@/algolia/utils';
import { IResult } from '@/algolia/types';

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
    const userId = parseInt(searchParams.get('userId') || '-1');
    const favoriteId = parseInt(searchParams.get('favoriteId') || '-1');
    const serviceCode = searchParams.get('serviceCode');
    const whereConditions: { user?: { id: number }; id?: number; serviceCode?: string } = {};
    if (userId > -1) {
      whereConditions.user = { id: userId };
    }
    if (favoriteId > -1) {
      whereConditions.id = favoriteId;
    }
    if (serviceCode) {
      whereConditions.serviceCode = serviceCode;
    }
    const dataSource = await getDBConnection();
    const favoriteRepository = dataSource.getRepository(Favorite);
    const favorites = await favoriteRepository.findAndCount({
      where: whereConditions,
      relations: {
        user: !(userId > -1)
      },
      cache: true
    });
    if (!favorites) {
      return new NextResponse('Not found', { status: 404 });
    }
    const codes = favorites[0].map(favorite=>favorite.serviceCode)
    const services = await fetchCodeServices(codes);
    return NextResponse.json({
      favorites: services,
      count: favorites[1]
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

const fetchCodeServices = async ( codes : string[] ): Promise<Service[]> => {
  const { results }: SearchResponses<unknown> = await search({
    query: '',
    page: 0,
    filters: { id: codes }
  });
  /* @ts-ignore */
  return transformServicesFromResults({ results: results[0].hits as IResult[] });
};
