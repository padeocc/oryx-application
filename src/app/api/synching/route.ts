import { runIndexation } from '@/algolia/indexation';
import { revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const clean = searchParams.get('clean');

  if (clean) {
    /* Removing next.js cache */
    revalidateTag('cms');
    revalidateTag('landing-page');
    /* Reindexing Algolia */
    const data = await runIndexation();
    return Response.json({ data });
  }

  return Response.json({ nothing: true });
}
