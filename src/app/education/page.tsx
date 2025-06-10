'use client';

import { ArrowLeft, BookOpen, GraduationCap, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NNLogicExplainer } from '@/components/education/NNLogicExplainer';
import React from 'react';

export default function EducationPage() {
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
                N/NN Logic Education
              </h1>
              <p className="text-gray-600 mt-1">
                Learn about Null/Not-Null Logic and its applications
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Learning Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <Link href="/education" className="block">
                    <div className="flex items-center p-2 bg-blue-50 text-blue-700 rounded-md">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>N/NN Logic Fundamentals</span>
                    </div>
                  </Link>
                  <Link href="/education" className="block">
                    <div className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <School className="h-4 w-4 mr-2" />
                      <span>Advanced Applications</span>
                    </div>
                  </Link>
                  <Link href="/education" className="block">
                    <div className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Case Studies</span>
                    </div>
                  </Link>
                </nav>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      N/NN Logic White Paper
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Empathy Tensor Calculation Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      EOQ Scoring Methodology
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Golden Loop Validation Framework
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                N/NN Logic Fundamentals
              </h2>
              <p className="text-gray-600">
                Explore the core principles of Null/Not-Null Logic and how it can be applied to analyze and optimize foundational memes.
              </p>
            </div>

            <NNLogicExplainer />

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Practical Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  N/NN Logic can be applied to analyze and optimize various types of concepts:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Cultural Memes</h3>
                    <p className="text-sm text-gray-600">
                      Analyze cultural beliefs and practices to identify those with low EOQ scores that may be causing harm or limiting potential.
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Organizational Values</h3>
                    <p className="text-sm text-gray-600">
                      Evaluate corporate values and mission statements for empathy optimization and boundary permeability.
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Personal Beliefs</h3>
                    <p className="text-sm text-gray-600">
                      Examine individual belief systems for rigidity, nullness awareness, and empathetic consideration.
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Social Systems</h3>
                    <p className="text-sm text-gray-600">
                      Analyze economic, political, and social structures to identify opportunities for existence optimization.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-center">
              <Link href="/visualization">
                <Button className="mr-4">
                  Explore 3D Visualization
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
