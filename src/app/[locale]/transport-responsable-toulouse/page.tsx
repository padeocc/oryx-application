import { permanentRedirect } from 'next/navigation';
export default async function Page(props: {}) {
  return permanentRedirect('/transport-responsable');
}
