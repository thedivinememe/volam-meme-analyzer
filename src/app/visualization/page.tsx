'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Meme, MemeCategory } from '@/types/meme';
import React, { useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MemeCard } from '@/components/meme/MemeCard';
import { MemeVisualization } from '@/components/visualization/MemeVisualization';
import { foundationalMemes } from '@/data/foundational-memes';

export default function VisualizationPage() {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(foundationalMemes[0]);
  const [filterCategory, setFilterCategory] = useState<MemeCategory | 'all'>('all');

  const filteredMemes = foundationalMemes.filter(meme => 
    filterCategory === 'all' || meme.category === filterCategory
  );

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
                3D Meme Visualization
              </h1>
              <p className="text-gray-600 mt-1">
                Explore meme relationships in 3D space
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={filterCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterCategory('all')}
          >
            All Memes
          </Button>
          <Button
            variant={filterCategory === MemeCategory.CURRENT_PROBLEMATIC ? 'default' : 'outline'}
            onClick={() => setFilterCategory(MemeCategory.CURRENT_PROBLEMATIC)}
          >
            Current Problematic
          </Button>
          <Button
            variant={filterCategory === MemeCategory.PROPOSED_OPTIMIZED ? 'default' : 'outline'}
            onClick={() => setFilterCategory(MemeCategory.PROPOSED_OPTIMIZED)}
          >
            Proposed Optimized
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interactive 3D Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Click and drag to rotate. Scroll to zoom. Click on a meme to select it.</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Spheres represent memes (size indicates influence)</li>
                    <li>Cubes represent concept nodes</li>
                    <li>Lines show influence relationships</li>
                    <li>Green lines = positive influence</li>
                    <li>Red lines = negative influence</li>
                    <li>Blue lines = transformative influence</li>
                  </ul>
                </div>
                <MemeVisualization 
                  memes={filteredMemes} 
                  selectedMeme={selectedMeme}
                  onSelectMeme={setSelectedMeme}
                />
              </CardContent>
            </Card>
          </div>

          {/* Selected Meme Details */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">
              Selected Meme
              <Badge variant="secondary" className="ml-2">
                Details
              </Badge>
            </h2>
            {selectedMeme ? (
              <MemeCard
                meme={selectedMeme}
                selected={true}
              />
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Select a meme to view details
                </CardContent>
              </Card>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Visualization Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  <span>Current Problematic Memes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Proposed Optimized Memes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500 mr-2"></div>
                  <span>Concept Nodes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
