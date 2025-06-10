import { CollectedData, DataCollectionQuery, ExternalDataCollector } from './data-collector';
import { LLMConfig, LLMConfigManager } from './config';
import { Meme, MemeCategory, MemeSource } from '@/types/meme';

export interface AnalysisContext {
  text: string;
  externalData?: CollectedData[];
  analysisDepth: 'basic' | 'comprehensive' | 'research-backed';
  includeOptimization: boolean;
}

export interface LLMResponse {
  meme: Meme;
  confidence: number;
  reasoning: string;
  sources: string[];
}

export class EnhancedMemeAnalyzer {
  
  /**
   * Analyze text with external data integration
   */
  static async analyzeWithContext(context: AnalysisContext): Promise<LLMResponse> {
    const config = LLMConfigManager.getConfig();
    
    // Collect external data if requested
    let externalData: CollectedData[] = [];
    if (context.analysisDepth !== 'basic') {
      externalData = await this.collectRelevantData(context.text);
    }
    
    // Generate the analysis prompt
    const prompt = this.generateAnalysisPrompt(context, externalData);
    
    // Call the LLM
    const llmResponse = await this.callLLM(config, prompt);
    
    // Parse and validate the response
    return this.parseResponse(llmResponse, externalData);
  }
  
  /**
   * Collect relevant external data for analysis
   */
  private static async collectRelevantData(text: string): Promise<CollectedData[]> {
    // Extract keywords from the text
    const keywords = this.extractKeywords(text);
    
    const query: DataCollectionQuery = {
      keywords,
      maxResults: 20,
      timeRange: {
        start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Last 90 days
        end: new Date(),
      },
    };
    
    const data = await ExternalDataCollector.collectData(query);
    return ExternalDataCollector.filterAndRank(data, 0.4);
  }
  
  /**
   * Extract keywords from text for data collection
   */
  private static extractKeywords(text: string): string[] {
    // Simple keyword extraction - in production would use NLP libraries
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Remove common stop words
    const stopWords = new Set(['this', 'that', 'with', 'have', 'will', 'from', 'they', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'would', 'there', 'could', 'other', 'more', 'very', 'what', 'know', 'just', 'first', 'into', 'over', 'think', 'also', 'your', 'work', 'life', 'only', 'can', 'still', 'should', 'after', 'being', 'now', 'made', 'before', 'here', 'through', 'when', 'where', 'much', 'some', 'these', 'many', 'then', 'them', 'well', 'were']);
    
    const filteredWords = words.filter(word => !stopWords.has(word));
    
    // Get word frequency
    const wordCount = new Map<string, number>();
    filteredWords.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });
    
    // Return top keywords
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }
  
  /**
   * Generate analysis prompt for the LLM
   */
  private static generateAnalysisPrompt(context: AnalysisContext, externalData: CollectedData[]): string {
    const basePrompt = `
You are an expert in analyzing foundational beliefs (memes) using Null/Not-Null Logic principles. 

Analyze the following text and extract a foundational belief or meme, then evaluate it according to these criteria:

1. **Nullness Ratio** (0-1): How undefined or uncertain is this belief? (1 = completely undefined, 0 = perfectly defined)
2. **Empathy Scores** (0-1 each):
   - Golden Rule: Reciprocity and fairness
   - Silver Rule: Non-harm and safety
   - Platinum Rule: Other-centered focus
   - Love Rule: Unconditional care and compassion
3. **Boundary Type**: How does this belief define in-groups vs out-groups?
4. **Cultural Strength** (0-1): How deeply embedded is this in current culture?

**Text to analyze:**
${context.text}
`;

    if (externalData.length > 0) {
      const contextData = externalData.slice(0, 5).map(data => 
        `Source: ${data.source} (${data.type})\nContent: ${data.content.substring(0, 200)}...\n`
      ).join('\n');
      
      return basePrompt + `

**Additional Context from External Sources:**
${contextData}

Use this external context to inform your analysis, particularly regarding cultural prevalence and current discourse around this topic.
`;
    }
    
    return basePrompt + `

Provide your analysis in the following JSON format:
{
  "name": "Brief name for the meme",
  "description": "Detailed description of the belief",
  "nullRatio": 0.0-1.0,
  "empathyScores": {
    "golden": 0.0-1.0,
    "silver": 0.0-1.0,
    "platinum": 0.0-1.0,
    "love": 0.0-1.0
  },
  "boundaryType": "Description of how this creates boundaries",
  "culturalStrength": 0.0-1.0,
  "negations": ["what this belief explicitly rejects"],
  "reasoning": "Explanation of your analysis",
  "confidence": 0.0-1.0
}`;
  }
  
  /**
   * Call the configured LLM
   */
  private static async callLLM(config: LLMConfig, prompt: string): Promise<string> {
    if (!config.apiKey) {
      // Fallback to simulated response
      return this.generateSimulatedResponse(prompt);
    }
    
    try {
      switch (config.provider) {
        case 'openai':
          return await this.callOpenAI(config, prompt);
        case 'anthropic':
          return await this.callAnthropic(config, prompt);
        case 'local':
          return await this.callLocalLLM(config, prompt);
        default:
          return this.generateSimulatedResponse(prompt);
      }
    } catch (error) {
      console.error('LLM call failed:', error);
      return this.generateSimulatedResponse(prompt);
    }
  }
  
  /**
   * Call OpenAI API
   */
  private static async callOpenAI(config: LLMConfig, prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert in analyzing foundational beliefs using Null/Not-Null Logic principles.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature,
      }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
  /**
   * Call Anthropic API
   */
  private static async callAnthropic(config: LLMConfig, prompt: string): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey!,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: config.maxTokens,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: config.temperature,
      }),
    });
    
    const data = await response.json();
    return data.content[0].text;
  }
  
  /**
   * Call local LLM
   */
  private static async callLocalLLM(config: LLMConfig, prompt: string): Promise<string> {
    const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature,
      }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
  /**
   * Generate simulated response when no API is available
   */
  private static generateSimulatedResponse(prompt: string): string {
    // Extract the text being analyzed
    const textMatch = prompt.match(/\*\*Text to analyze:\*\*\s*([\s\S]*?)(?:\n\*\*|$)/);
    const text = textMatch ? textMatch[1].trim() : 'unknown concept';
    
    const name = text.split('.')[0].trim().substring(0, 50);
    
    return JSON.stringify({
      name,
      description: `Analysis of the concept: ${text.substring(0, 200)}`,
      nullRatio: 0.2 + Math.random() * 0.4,
      empathyScores: {
        golden: 0.6 + Math.random() * 0.4,
        silver: 0.6 + Math.random() * 0.4,
        platinum: 0.5 + Math.random() * 0.5,
        love: 0.4 + Math.random() * 0.6,
      },
      boundaryType: 'Fluid I/Not-I boundary with adaptive characteristics',
      culturalStrength: 0.1 + Math.random() * 0.3,
      negations: ['zero-sum thinking', 'exploitation', 'short-term focus'],
      reasoning: 'This analysis is based on N/NN Logic principles, evaluating the concept for empathy optimization and boundary permeability.',
      confidence: 0.7 + Math.random() * 0.2,
    });
  }
  
  /**
   * Parse LLM response into structured format
   */
  private static parseResponse(llmResponse: string, externalData: CollectedData[]): LLMResponse {
    try {
      // Try to extract JSON from the response
      const jsonMatch = llmResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : llmResponse;
      const parsed = JSON.parse(jsonStr);
      
      // Create the meme object
      const meme: Meme = {
        id: `enhanced-${Date.now()}`,
        name: parsed.name || 'Analyzed Concept',
        description: parsed.description || 'No description provided',
        category: MemeCategory.LLM_DISCOVERED,
        nullRatio: Math.max(0, Math.min(1, parsed.nullRatio || 0.5)),
        empathyScores: {
          golden: Math.max(0, Math.min(1, parsed.empathyScores?.golden || 0.5)),
          silver: Math.max(0, Math.min(1, parsed.empathyScores?.silver || 0.5)),
          platinum: Math.max(0, Math.min(1, parsed.empathyScores?.platinum || 0.5)),
          love: Math.max(0, Math.min(1, parsed.empathyScores?.love || 0.5)),
        },
        boundaryType: parsed.boundaryType || 'Undefined boundary',
        boundaryDefinition: {
          type: 'fluid',
          description: parsed.boundaryType || 'Boundary extracted from LLM analysis',
          inclusionCriteria: ['positive-impact', 'conscious-awareness'],
          exclusionCriteria: parsed.negations || ['harm', 'exploitation'],
          scalarValue: 0.7,
        },
        eoqScore: 0, // Will be calculated by EOQ calculator
        culturalStrength: Math.max(0, Math.min(1, parsed.culturalStrength || 0.2)),
        negations: parsed.negations || [],
        influences: [],
        refinementHistory: [],
        position: {
          x: (Math.random() * 4) - 2,
          y: (Math.random() * 4) - 2,
          z: (Math.random() * 4) - 2,
        },
        color: '#3B82F6',
        size: 1.0,
        createdAt: new Date(),
        lastAnalyzed: new Date(),
        source: MemeSource.SOCIAL_MEDIA_ANALYSIS,
      };
      
      return {
        meme,
        confidence: Math.max(0, Math.min(1, parsed.confidence || 0.7)),
        reasoning: parsed.reasoning || 'Analysis completed using N/NN Logic principles',
        sources: externalData.map(d => d.source),
      };
      
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
      
      // Fallback to basic analysis
      return {
        meme: {
          id: `fallback-${Date.now()}`,
          name: 'Analysis Failed',
          description: 'Could not parse LLM response',
          category: MemeCategory.LLM_DISCOVERED,
          nullRatio: 0.8,
          empathyScores: { golden: 0.5, silver: 0.5, platinum: 0.5, love: 0.5 },
          boundaryType: 'Unknown',
          boundaryDefinition: {
            type: 'fluid',
            description: 'Unknown boundary',
            inclusionCriteria: [],
            exclusionCriteria: [],
            scalarValue: 0.5,
          },
          eoqScore: 0.5,
          culturalStrength: 0.5,
          negations: [],
          influences: [],
          refinementHistory: [],
          position: { x: 0, y: 0, z: 0 },
          color: '#6B7280',
          size: 1.0,
          createdAt: new Date(),
          lastAnalyzed: new Date(),
          source: MemeSource.MANUAL_ENTRY,
        },
        confidence: 0.1,
        reasoning: 'Failed to parse LLM response',
        sources: [],
      };
    }
  }
}
