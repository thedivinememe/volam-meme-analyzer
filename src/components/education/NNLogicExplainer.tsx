'use client';

import { ArrowRight, BookOpen, Brain, Lightbulb, Shapes } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ConceptSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
}

export function NNLogicExplainer() {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections: ConceptSection[] = [
    {
      id: 'intro',
      title: 'Introduction to N/NN Logic',
      description: 
        'Null/Not-Null (N/NN) Logic is a framework for understanding how concepts are defined through both positive assertions and negations. It acknowledges that all concepts exist in a state of partial definition, with varying degrees of "nullness" (uncertainty or incompleteness).',
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      examples: [
        'A chair is defined both by what it is (has legs, supports sitting) and what it is not (not a table, not a bed)',
        'Scientific theories are defined both by what they explain and what they explicitly exclude'
      ]
    },
    {
      id: 'nullness',
      title: 'Nullness & Epistemic Humility',
      description: 
        'Every concept has a "nullness ratio" - the degree to which it remains undefined or uncertain. Acknowledging this nullness is a form of epistemic humility that prevents rigid thinking and allows for evolution of ideas.',
      icon: <Shapes className="h-8 w-8 text-blue-500" />,
      examples: [
        'Democracy has a nullness ratio because its implementation varies widely across cultures and time',
        'Even scientific "facts" retain some nullness as they are subject to refinement with new evidence'
      ]
    },
    {
      id: 'xshaped',
      title: 'X-Shaped Hole Principle',
      description: 
        'Concepts are often defined more clearly by what they exclude than what they include. This "negative space" or "X-shaped hole" provides definition through boundaries and contrasts.',
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      examples: [
        'Freedom is often defined by the absence of constraints rather than by positive attributes',
        'Health is frequently defined as the absence of disease rather than by specific positive markers'
      ]
    },
    {
      id: 'golden',
      title: 'The Golden Loop',
      description: 
        'The Golden Loop is a validation cycle for concepts that ensures they maintain both epistemic humility and empathetic optimization. It requires acknowledging uncertainty while still optimizing for collective benefit.',
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      examples: [
        'A concept passes the Golden Loop if it acknowledges its limitations while maximizing reciprocal benefit',
        'Concepts that claim absolute certainty or that optimize for individual benefit at collective cost fail the Golden Loop'
      ]
    },
    {
      id: 'eoq',
      title: 'Existence Optimization Quotient',
      description: 
        'The EOQ measures how well a concept optimizes existence patterns for conscious beings. It considers empathy, nullness awareness, boundary permeability, refinement velocity, and cultural compatibility.',
      icon: <ArrowRight className="h-8 w-8 text-red-500" />,
      examples: [
        'Concepts with high empathy scores and healthy nullness awareness have higher EOQ scores',
        'Rigid concepts with impermeable boundaries and low adaptability have lower EOQ scores'
      ]
    }
  ];

  const activeContent = sections.find(s => s.id === activeSection);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Understanding N/NN Logic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'outline'}
                onClick={() => setActiveSection(section.id)}
                className="flex items-center gap-2"
              >
                {section.title}
              </Button>
            ))}
          </div>

          {activeContent && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {activeContent.icon}
                <h3 className="text-xl font-semibold">{activeContent.title}</h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {activeContent.description}
              </p>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                <ul className="space-y-2">
                  {activeContent.examples.map((example, index) => (
                    <li key={index} className="flex items-start">
                      <Badge className="mt-1 mr-2" variant="outline">
                        {index + 1}
                      </Badge>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Principles of N/NN Logic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-purple-700 mb-2">1. Epistemic Humility</h3>
              <p className="text-sm">
                All concepts contain some degree of uncertainty or &quot;nullness.&quot; Acknowledging this prevents dogmatic thinking and allows for evolution.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">2. Negative Definition</h3>
              <p className="text-sm">
                Concepts are often defined more clearly by what they exclude than what they include (X-Shaped Hole principle).
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">3. Empathetic Optimization</h3>
              <p className="text-sm">
                Concepts should be evaluated by how well they optimize existence for conscious beings, not just by their logical consistency.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-red-700 mb-2">4. Boundary Permeability</h3>
              <p className="text-sm">
                The rigidity of concept boundaries affects their adaptability and inclusivity. Fluid boundaries allow for greater evolution.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
