import { fetchNoteById } from "@/lib/api";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotePreview from "@/components/NotePreview/NotePreview";

type PageProps = {
  params: { id: string };
};

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}