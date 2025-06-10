'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Meme, MemeCategory } from '@/types/meme';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EOQCalculator } from '@/lib/eoq/calculator';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MemeCardProps {
  meme: Meme;
  selected?: boolean;
  onClick?: () => void;
}

export function MemeCard({ meme, selected = false, onClick }: MemeCardProps) {
  const eoqResult = EOQCalculator.calculateEOQ(meme);
  
  const getCategoryColor = (category: MemeCategory) => {
    switch (category) {
      case MemeCategory.CURRENT_PROBLEMATIC:
        return 'bg-red-100 text-red-800 border-red-200';
      case MemeCategory.PROPOSED_OPTIMIZED:
        return 'bg-green-100 text-green-800 border-green-200';
      case MemeCategory.LLM_DISCOVERED:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case MemeCategory.GENETICALLY_EVOLVED:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEOQColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-blue-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{meme.name}</CardTitle>
          <Badge className={getCategoryColor(meme.category)}>
            {meme.category.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">
          {meme.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span>EOQ Score:</span>
            <span className={`font-semibold ${getEOQColor(eoqResult.totalScore)}`}>
              {(eoqResult.totalScore * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Empathy:</span>
            <span className={getEOQColor(eoqResult.componentScores.empathy)}>
              {(eoqResult.componentScores.empathy * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Certainty:</span>
            <span className={getEOQColor(eoqResult.componentScores.certainty)}>
              {(eoqResult.componentScores.certainty * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Cultural:</span>
            <span>{(meme.culturalStrength * 100).toFixed(0)}%</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 border-t pt-2">
          <div className="font-medium">Boundary Type:</div>
          <div>{meme.boundaryType}</div>
        </div>
        
        {eoqResult.recommendedImprovements.length > 0 && (
          <div className="text-xs">
            <div className="font-medium text-orange-600">Recommendations:</div>
            <div className="text-orange-700">
              {eoqResult.recommendedImprovements[0]}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link href={`/memes/edit/${meme.id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full flex items-center gap-1">
            <Edit className="h-3 w-3" /> Edit Meme
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
