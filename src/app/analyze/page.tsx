'use client';

import { AnalysisContext, EnhancedMemeAnalyzer } from '@/lib/llm/enhanced-analyzer';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { EOQCalculator } from '@/lib/eoq/calculator';
import Link from 'next/link';
import { Meme } from '@/types/meme';
import { MemeCard } from '@/components/meme/MemeCard';
import { foundationalMemes } from '@/data/foundational-memes';
import { useRouter } from 'next/navigation';

export default function AnalyzePage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedMeme, setAnalyzedMeme] = useState<Meme | null>(null);
  const [optimizedMeme, setOptimizedMeme] = useState<Meme | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setAnalyzedMeme(null);
    setOptimizedMeme(null);
    
    try {
      const context: AnalysisContext = {
        text,
        analysisDepth: 'comprehensive',
        includeOptimization: false,
      };
      
      const response = await EnhancedMemeAnalyzer.analyzeWithContext(context);
      const memeWithEOQ = { ...response.meme, eoqScore: EOQCalculator.calculateEOQ(response.meme).totalScore };
      setAnalyzedMeme(memeWithEOQ);
    } catch (error) {
      console.error('Error analyzing text:', error);
      alert('Error analyzing text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleOptimize = async () => {
    if (!analyzedMeme) return;
    
    setIsOptimizing(true);
    
    try {
      const context: AnalysisContext = {
        text: `Optimize this meme for better empathy and collective flourishing: ${analyzedMeme.description}`,
        analysisDepth: 'research-backed',
        includeOptimization: true,
      };
      
      const response = await EnhancedMemeAnalyzer.analyzeWithContext(context);
      const optimized = {
        ...response.meme,
        id: `optimized-${Date.now()}`,
        name: `Optimized: ${analyzedMeme.name}`,
        description: `An optimized version of the original meme: ${analyzedMeme.description}`,
        eoqScore: EOQCalculator.calculateEOQ(response.meme).totalScore,
      };
      setOptimizedMeme(optimized);
    } catch (error) {
      console.error('Error optimizing meme:', error);
      alert('Error optimizing meme. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };
  
  const handleSaveAnalyzed = () => {
    if (analyzedMeme) {
      foundationalMemes.push(analyzedMeme);
      alert('Meme saved successfully!');
      router.push('/');
    }
  };
  
  const handleSaveOptimized = () => {
    if (optimizedMeme) {
      foundationalMemes.push(optimizedMeme);
      alert('Optimized meme saved successfully!');
      router.push('/');
    }
  };
  
  const handleSaveBoth = () => {
    if (analyzedMeme && optimizedMeme) {
      foundationalMemes.push(analyzedMeme);
      foundationalMemes.push(optimizedMeme);
      alert('Both memes saved successfully!');
      router.push('/');
    }
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
                Analyze Text
              </h1>
              <p className="text-gray-600 mt-1">
                Extract meme information from text using N/NN Logic
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Input Text</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full h-64 p-4 border rounded-md"
                  placeholder="Enter text to analyze for foundational beliefs and memes..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !text.trim()}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Text'
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {analyzedMeme && (
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={handleOptimize} 
                      disabled={isOptimizing || !analyzedMeme}
                      className="w-full flex items-center gap-2"
                    >
                      {isOptimizing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Optimize Meme
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={handleSaveAnalyzed} 
                      disabled={!analyzedMeme}
                      variant="outline"
                      className="w-full"
                    >
                      Save Analyzed Meme
                    </Button>
                    
                    {optimizedMeme && (
                      <>
                        <Button 
                          onClick={handleSaveOptimized} 
                          variant="outline"
                          className="w-full"
                        >
                          Save Optimized Meme
                        </Button>
                        
                        <Button 
                          onClick={handleSaveBoth} 
                          variant="default"
                          className="w-full"
                        >
                          Save Both Memes
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          {/* Results Section */}
          <div className="space-y-6">
            {analyzedMeme && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Analyzed Meme</h2>
                <MemeCard meme={analyzedMeme} />
              </div>
            )}
            
            {optimizedMeme && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Optimized Meme</h2>
                <MemeCard meme={optimizedMeme} />
              </div>
            )}
            
            {!analyzedMeme && !isAnalyzing && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Enter text and click &quot;Analyze Text&quot; to extract meme information
                </CardContent>
              </Card>
            )}
            
            {isAnalyzing && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                  <p className="text-gray-600">Analyzing text using N/NN Logic...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
