import SingleCategory from "../page";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <SingleCategory id={params.id} />;
}
