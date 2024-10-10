import { runIndexation } from '@/algolia/indexation';

export async function GET() {
  const data = await runIndexation();
  return Response.json({ data });
}
