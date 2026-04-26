import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};


import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";

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
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}