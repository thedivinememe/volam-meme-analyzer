'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Meme } from '@/types/meme';
import { MemeForm } from '@/components/meme/MemeForm';
import React from 'react';
import { foundationalMemes } from '@/data/foundational-memes';
import { useRouter } from 'next/navigation';

interface EditMemeClientProps {
  meme: Meme;
}

export default function EditMemeClient({ meme }: EditMemeClientProps) {
  const router = useRouter();
  
  const handleSave = (updatedMeme: Meme) => {
    // In a real app, this would update the meme in a database or API
    // For now, we'll just update it in our local data and redirect
    
    // Find the index of the meme in the array
    const index = foundationalMemes.findIndex(m => m.id === updatedMeme.id);
    
    if (index !== -1) {
      // Update the meme in the array
      foundationalMemes[index] = updatedMeme;
      
      // Show success message
      alert('Meme updated successfully!');
      
      // Redirect to the dashboard
      router.push('/');
    }
  };
  
  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Meme: {meme.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Update this foundational belief
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <MemeForm 
          initialMeme={meme}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
