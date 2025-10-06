import { algoliaSearch, search } from '@/algolia/search';
import { Filters } from '@/types';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('search');
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));
  const filters = searchParams.get('filters');

  if (search) {
    const results = await algoliaSearch({
      query,
      page,
      limit,
      filters: filters ? (JSON.parse(filters) as Filters) : undefined,
    });

    return Response.json(results);
  }

  return Response.json({ nothing: true });
}
