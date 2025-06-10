'use client';

import { ArrowLeft, Check, Database, Key, Settings2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalDataSource, LLMConfig, LLMConfigManager } from '@/lib/llm/config';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const [llmConfig, setLlmConfig] = useState<LLMConfig>(LLMConfigManager.getConfig());
  const [dataSources, setDataSources] = useState<ExternalDataSource[]>(LLMConfigManager.getDataSources());
  const [saved, setSaved] = useState(false);

  const handleLLMConfigChange = (field: keyof LLMConfig, value: string | number) => {
    const newConfig = { ...llmConfig, [field]: value };
    setLlmConfig(newConfig);
    LLMConfigManager.setConfig(newConfig);
  };

  const handleDataSourceChange = (name: string, field: keyof ExternalDataSource, value: string | boolean) => {
    const newDataSources = dataSources.map(ds => 
      ds.name === name ? { ...ds, [field]: value } : ds
    );
    setDataSources(newDataSources);
    LLMConfigManager.setDataSource(name, { [field]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
                Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Configure LLM providers and external data sources
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* LLM Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              LLM Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="provider">Provider</Label>
                <Select 
                  id="provider"
                  value={llmConfig.provider} 
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleLLMConfigChange('provider', e.target.value)}
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="local">Local LLM</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={llmConfig.model}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLLMConfigChange('model', e.target.value)}
                  placeholder="gpt-4, claude-3-sonnet, etc."
                />
              </div>

              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={llmConfig.apiKey || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLLMConfigChange('apiKey', e.target.value)}
                  placeholder="Enter your API key"
                />
              </div>

              <div>
                <Label htmlFor="baseUrl">Base URL (for local LLM)</Label>
                <Input
                  id="baseUrl"
                  value={llmConfig.baseUrl || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLLMConfigChange('baseUrl', e.target.value)}
                  placeholder="http://localhost:1234"
                />
              </div>

              <div>
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={llmConfig.maxTokens}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLLMConfigChange('maxTokens', parseInt(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={llmConfig.temperature}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLLMConfigChange('temperature', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              External Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {dataSources.map((source) => (
              <div key={source.name} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{source.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{source.type.replace('_', ' ')}</p>
                  </div>
                  <Switch
                    checked={source.enabled}
                    onCheckedChange={(checked: boolean) => handleDataSourceChange(source.name, 'enabled', checked)}
                  />
                </div>

                {source.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${source.name}-url`}>Base URL</Label>
                      <Input
                        id={`${source.name}-url`}
                        value={source.baseUrl}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDataSourceChange(source.name, 'baseUrl', e.target.value)}
                        placeholder="API base URL"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`${source.name}-key`}>API Key</Label>
                      <Input
                        id={`${source.name}-key`}
                        type="password"
                        value={source.apiKey || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDataSourceChange(source.name, 'apiKey', e.target.value)}
                        placeholder="Enter API key (if required)"
                      />
                    </div>
                  </div>
                )}

                {source.name === 'ArXiv' && (
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                    <Key className="h-4 w-4 inline mr-1" />
                    No API key required for ArXiv
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Saved!
              </>
            ) : (
              'Save Configuration'
            )}
          </Button>
        </div>

        {/* Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-900">LLM Providers:</h4>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>OpenAI:</strong> Requires API key from OpenAI platform</li>
                <li><strong>Anthropic:</strong> Requires API key from Anthropic console</li>
                <li><strong>Local LLM:</strong> Connect to local LLM server (e.g., LM Studio, Ollama)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Data Sources:</h4>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>ArXiv:</strong> Academic papers (no API key required)</li>
                <li><strong>Reddit:</strong> Social media discussions (requires Reddit API key)</li>
                <li><strong>News API:</strong> News articles (requires News API key)</li>
                <li><strong>Twitter/X:</strong> Social media posts (requires Twitter API key)</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-3 rounded">
              <p><strong>Note:</strong> Without API keys, the system will use simulated data for demonstration purposes. For production use, configure real API keys for enhanced analysis.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
