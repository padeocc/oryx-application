import { runIndexation } from '@/algolia/indexation';
import { revalidateTag } from 'next/cache';

export async function GET(request: Request, { params }: { params: Promise<{ clean: string }> }) {
  // const clean = (await params)?.clean;

  // console.log(await params);
  // if (clean) {
  /* Removing next.js cache */
  revalidateTag('cms');
  /* Reindexing Algolia */
  const data = await runIndexation();
  return Response.json({ data });
  //}

  return Response.json({ nothing: true });
}
