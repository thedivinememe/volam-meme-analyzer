'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Meme } from '@/types/meme';
import { MemeForm } from '@/components/meme/MemeForm';
import React from 'react';
import { foundationalMemes } from '@/data/foundational-memes';
import { useRouter } from 'next/navigation';

export default function CreateMemePage() {
  const router = useRouter();
  
  const handleSave = (meme: Meme) => {
    // In a real app, this would save to a database or API
    // For now, we'll just add it to our local data and redirect
    
    // Add the new meme to the foundational memes array
    // Note: In a real app, this would be handled by a proper state management solution
    foundationalMemes.push(meme);
    
    // Show success message
    alert('Meme created successfully!');
    
    // Redirect to the dashboard
    router.push('/');
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
                Create New Meme
              </h1>
              <p className="text-gray-600 mt-1">
                Define a new foundational belief for analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <MemeForm 
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
