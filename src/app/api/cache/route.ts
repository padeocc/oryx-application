import { revalidateTag } from 'next/cache';

export async function GET() {
  revalidateTag('cms');
  return Response.json({ data: 'ok' });
}
