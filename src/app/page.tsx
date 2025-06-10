'use client';

import { BookOpen, Box, Brain, Plus, Settings, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Meme, MemeCategory } from '@/types/meme';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MemeCard } from '@/components/meme/MemeCard';
import { foundationalMemes } from '@/data/foundational-memes';

export default function Dashboard() {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(foundationalMemes[0]);
  const [filterCategory, setFilterCategory] = useState<MemeCategory | 'all'>('all');

  const filteredMemes = foundationalMemes.filter(meme => 
    filterCategory === 'all' || meme.category === filterCategory
  );

  const currentProblematic = foundationalMemes.filter(m => m.category === MemeCategory.CURRENT_PROBLEMATIC);
  const proposedOptimized = foundationalMemes.filter(m => m.category === MemeCategory.PROPOSED_OPTIMIZED);
  
  const avgCurrentEOQ = currentProblematic.reduce((sum, m) => sum + m.eoqScore, 0) / currentProblematic.length;
  const avgProposedEOQ = proposedOptimized.reduce((sum, m) => sum + m.eoqScore, 0) / proposedOptimized.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            VOLaM Meme Analyzer
          </h1>
          <p className="text-gray-600 mt-1">
            Analyzing foundational beliefs through Null/Not-Null Logic
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <Link href="/memes/create">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Meme
              </Button>
            </Link>
            
            <Link href="/analyze">
              <Button variant="outline" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Analyze Text
              </Button>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/education">
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Education
              </Button>
            </Link>
            <Link href="/visualization">
              <Button className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                3D Visualization
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Memes</p>
                  <p className="text-2xl font-bold text-red-600">
                    {(avgCurrentEOQ * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-500">Average EOQ</p>
                </div>
                <Users className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proposed Memes</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(avgProposedEOQ * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-500">Average EOQ</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improvement</p>
                  <p className="text-2xl font-bold text-blue-600">
                    +{((avgProposedEOQ - avgCurrentEOQ) * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-500">EOQ Gain</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Analysis</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {foundationalMemes.length}
                  </p>
                  <p className="text-xs text-gray-500">Total Memes</p>
                </div>
                <Brain className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

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
          <Button
            variant={filterCategory === MemeCategory.LLM_DISCOVERED ? 'default' : 'outline'}
            onClick={() => setFilterCategory(MemeCategory.LLM_DISCOVERED)}
          >
            LLM Discovered
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meme List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">
              Foundational Memes
              <Badge variant="secondary" className="ml-2">
                {filteredMemes.length}
              </Badge>
            </h2>
            <div className="space-y-4">
              {filteredMemes.map((meme) => (
                <MemeCard
                  key={meme.id}
                  meme={meme}
                  selected={selectedMeme?.id === meme.id}
                  onClick={() => setSelectedMeme(meme)}
                />
              ))}
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="lg:col-span-2">
            {selectedMeme ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedMeme.name}</span>
                    <Badge 
                      style={{ backgroundColor: selectedMeme.color }}
                      className="text-white"
                    >
                      EOQ: {(selectedMeme.eoqScore * 100).toFixed(0)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{selectedMeme.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">N/NN Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Null Ratio</div>
                        <div className="text-lg font-semibold">
                          {(selectedMeme.nullRatio * 100).toFixed(0)}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${selectedMeme.nullRatio * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Cultural Strength</div>
                        <div className="text-lg font-semibold">
                          {(selectedMeme.culturalStrength * 100).toFixed(0)}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${selectedMeme.culturalStrength * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Empathy Scores</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedMeme.empathyScores).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="capitalize text-sm">{key} Rule:</span>
                          <span className="font-semibold">
                            {(value * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Boundary Analysis</h3>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-sm font-medium">{selectedMeme.boundaryType}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {selectedMeme.boundaryDefinition.description}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">X-Shaped Hole (Negations)</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeme.negations.map((negation, index) => (
                        <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                          NOT: {negation}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedMeme.influences.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Influences</h3>
                      <div className="space-y-2">
                        {selectedMeme.influences.map((influence, index) => (
                          <div key={index} className="p-2 border rounded">
                            <div className="font-medium text-sm">
                              {influence.targetConceptName}
                            </div>
                            <div className="text-xs text-gray-600">
                              Strength: {(influence.influenceStrength * 100).toFixed(0)}% | 
                              Impact: {influence.empathyImpact > 0 ? '+' : ''}{(influence.empathyImpact * 100).toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Select a meme to view detailed analysis
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
