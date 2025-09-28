import SingleBrand from "../page";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <SingleBrand id={params.id} />;
}
