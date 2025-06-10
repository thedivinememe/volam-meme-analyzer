import EditMemeClient from './EditMemeClient';
import React from 'react';
import { foundationalMemes } from '@/data/foundational-memes';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return foundationalMemes.map((meme) => ({
    id: meme.id,
  }));
}

interface EditMemePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMemePage({ params }: EditMemePageProps) {
  const { id } = await params;
  const meme = foundationalMemes.find(m => m.id === id);
  
  if (!meme) {
    notFound();
  }

  return <EditMemeClient meme={meme} />;
}
