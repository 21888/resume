import ClientPage from './ClientPage';
import { projectsData } from '@/data/projects';

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <ClientPage />;
}