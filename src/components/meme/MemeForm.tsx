'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Meme, MemeCategory, MemeSource } from '@/types/meme';
import { Plus, Save, Trash } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { EOQCalculator } from '@/lib/eoq/calculator';

interface MemeFormProps {
  initialMeme?: Meme;
  onSave: (meme: Meme) => void;
  onCancel: () => void;
}

export function MemeForm({ initialMeme, onSave, onCancel }: MemeFormProps) {
  const [meme, setMeme] = useState<Meme>(
    initialMeme || {
      id: `meme-${Date.now()}`,
      name: '',
      description: '',
      category: MemeCategory.LLM_DISCOVERED,
      nullRatio: 0.5,
      empathyScores: {
        golden: 0.5,
        silver: 0.5,
        platinum: 0.5,
        love: 0.5,
      },
      boundaryType: 'Fluid I/Not-I',
      boundaryDefinition: {
        type: 'fluid',
        description: '',
        inclusionCriteria: [],
        exclusionCriteria: [],
        scalarValue: 0.8, // 0-1, where 0 = completely rigid, 1 = completely fluid
      },
      eoqScore: 0,
      culturalStrength: 0.5,
      negations: [],
      influences: [],
      refinementHistory: [],
      position: { x: 0, y: 0, z: 0 },
      color: '#3B82F6',
      size: 1.0,
      createdAt: new Date(),
      lastAnalyzed: new Date(),
      source: MemeSource.MANUAL_ENTRY,
    }
  );

  // Update EOQ score whenever relevant fields change
  React.useEffect(() => {
    const eoqResult = EOQCalculator.calculateEOQ(meme);
    setMeme(prev => ({ ...prev, eoqScore: eoqResult.totalScore }));
  }, [
    meme.nullRatio, 
    meme.empathyScores, 
    meme.boundaryDefinition, 
    meme.culturalStrength
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'boundaryDefinition') {
        setMeme(prev => ({
          ...prev,
          boundaryDefinition: {
            ...prev.boundaryDefinition,
            [child]: value
          }
        }));
      } else if (parent === 'empathyScores') {
        setMeme(prev => ({
          ...prev,
          empathyScores: {
            ...prev.empathyScores,
            [child]: value
          }
        }));
      }
    } else {
      setMeme(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberChange = (name: string, value: string) => {
    // Convert to number and clamp between 0 and 1
    const numValue = Math.max(0, Math.min(1, parseFloat(value) || 0));
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'boundaryDefinition') {
        setMeme(prev => ({
          ...prev,
          boundaryDefinition: {
            ...prev.boundaryDefinition,
            [child]: numValue
          }
        }));
      } else if (parent === 'empathyScores') {
        setMeme(prev => ({
          ...prev,
          empathyScores: {
            ...prev.empathyScores,
            [child]: numValue
          }
        }));
      }
    } else {
      setMeme(prev => ({ ...prev, [name]: numValue }));
    }
  };

  const handleAddNegation = () => {
    setMeme(prev => ({
      ...prev,
      negations: [...prev.negations, '']
    }));
  };

  const handleRemoveNegation = (index: number) => {
    setMeme(prev => ({
      ...prev,
      negations: prev.negations.filter((_, i) => i !== index)
    }));
  };

  const handleNegationChange = (index: number, value: string) => {
    setMeme(prev => ({
      ...prev,
      negations: prev.negations.map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddCriteria = (type: 'inclusion' | 'exclusion') => {
    setMeme(prev => ({
      ...prev,
      boundaryDefinition: {
        ...prev.boundaryDefinition,
        [type === 'inclusion' ? 'inclusionCriteria' : 'exclusionCriteria']: [
          ...prev.boundaryDefinition[type === 'inclusion' ? 'inclusionCriteria' : 'exclusionCriteria'],
          ''
        ]
      }
    }));
  };

  const handleRemoveCriteria = (type: 'inclusion' | 'exclusion', index: number) => {
    setMeme(prev => ({
      ...prev,
      boundaryDefinition: {
        ...prev.boundaryDefinition,
        [type === 'inclusion' ? 'inclusionCriteria' : 'exclusionCriteria']: 
          prev.boundaryDefinition[type === 'inclusion' ? 'inclusionCriteria' : 'exclusionCriteria']
            .filter((_, i) => i !== index)
      }
    }));
  };

  const handleCriteriaChange = (type: 'inclusion' | 'exclusion', index: number, value: string) => {
    setMeme(prev => ({
      ...prev,
      boundaryDefinition: {
        ...prev.boundaryDefinition,
        [type === 'inclusion' ? 'inclusionCriteria' : 'exclusionCriteria']: 
          prev.boundaryDefinition[type === 'inclusion' ? 'inclusionCriteria' : 'exclusionCriteria']
            .map((item, i) => i === index ? value : item)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(meme);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={meme.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={meme.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={meme.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                {Object.values(MemeCategory).map(category => (
                  <option key={category} value={category}>
                    {category.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="color"
                  value={meme.color}
                  onChange={handleChange}
                  className="p-1 border rounded"
                />
                <span>{meme.color}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>N/NN Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Null Ratio: {(meme.nullRatio * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meme.nullRatio}
                onChange={(e) => handleNumberChange('nullRatio', e.target.value)}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                Higher values indicate more uncertainty or incompleteness
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Cultural Strength: {(meme.culturalStrength * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meme.culturalStrength}
                onChange={(e) => handleNumberChange('culturalStrength', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Boundary Type</label>
              <select
                name="boundaryDefinition.type"
                value={meme.boundaryDefinition.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="rigid">Rigid</option>
                <option value="permeable">Permeable</option>
                <option value="fluid">Fluid</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Boundary Fluidity: {(meme.boundaryDefinition.scalarValue * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meme.boundaryDefinition.scalarValue}
                onChange={(e) => handleNumberChange('boundaryDefinition.scalarValue', e.target.value)}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                0% = completely rigid, 100% = completely fluid
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Boundary Description</label>
              <input
                type="text"
                name="boundaryDefinition.description"
                value={meme.boundaryDefinition.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empathy Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Golden Rule (Reciprocity): {(meme.empathyScores.golden * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meme.empathyScores.golden}
                onChange={(e) => handleNumberChange('empathyScores.golden', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Silver Rule (Non-harm): {(meme.empathyScores.silver * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meme.empathyScores.silver}
                onChange={(e) => handleNumberChange('empathyScores.silver', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Platinum Rule (Other-centered): {(meme.empathyScores.platinum * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meme.empathyScores.platinum}
                onChange={(e) => handleNumberChange('empathyScores.platinum', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Love Rule (Unconditional care): {(meme.empathyScores.love * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={meme.empathyScores.love}
                onChange={(e) => handleNumberChange('empathyScores.love', e.target.value)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>X-Shaped Hole (Negations)</span>
              <Button 
                type="button" 
                size="sm" 
                onClick={handleAddNegation}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {meme.negations.length === 0 ? (
              <div className="text-sm text-gray-500">No negations defined yet</div>
            ) : (
              meme.negations.map((negation, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={negation}
                    onChange={(e) => handleNegationChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                    placeholder="What this concept is NOT"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleRemoveNegation(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Boundary Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Inclusion Criteria</h3>
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={() => handleAddCriteria('inclusion')}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
              
              {meme.boundaryDefinition.inclusionCriteria.length === 0 ? (
                <div className="text-sm text-gray-500">No inclusion criteria defined yet</div>
              ) : (
                <div className="space-y-2">
                  {meme.boundaryDefinition.inclusionCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={criteria}
                        onChange={(e) => handleCriteriaChange('inclusion', index, e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        placeholder="What is included"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleRemoveCriteria('inclusion', index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Exclusion Criteria</h3>
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={() => handleAddCriteria('exclusion')}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
              
              {meme.boundaryDefinition.exclusionCriteria.length === 0 ? (
                <div className="text-sm text-gray-500">No exclusion criteria defined yet</div>
              ) : (
                <div className="space-y-2">
                  {meme.boundaryDefinition.exclusionCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={criteria}
                        onChange={(e) => handleCriteriaChange('exclusion', index, e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        placeholder="What is excluded"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleRemoveCriteria('exclusion', index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>EOQ Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {(meme.eoqScore * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Existence Optimization Quotient
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div 
                  className={`h-4 rounded-full ${
                    meme.eoqScore > 0.8 ? 'bg-green-500' :
                    meme.eoqScore > 0.6 ? 'bg-blue-500' :
                    meme.eoqScore > 0.4 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${meme.eoqScore * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Meme
          </Button>
        </CardFooter>
      </div>
    </form>
  );
}
