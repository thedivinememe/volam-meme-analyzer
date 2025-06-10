import { Meme, MemeCategory, MemeSource } from '@/types/meme';

/**
 * Service for analyzing text using LLM to extract meme information
 */
export class MemeAnalyzerService {
  private static apiKey: string | null = null;
  
  /**
   * Set the API key for the LLM service
   */
  static setApiKey(key: string) {
    this.apiKey = key;
  }
  
  /**
   * Check if the API key is set
   */
  static hasApiKey(): boolean {
    return !!this.apiKey;
  }
  
  /**
   * Analyze text to extract meme information
   * In a real implementation, this would call an actual LLM API
   */
  static async analyzeText(text: string): Promise<Meme> {
    // In a real implementation, this would call an LLM API like OpenAI or Anthropic
    // For now, we'll simulate the response
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random ID
    const id = `meme-${Date.now()}`;
    
    // Extract a name from the text (first sentence or first 50 chars)
    const name = text.split('.')[0].trim().substring(0, 50);
    
    // Use the text as the description
    const description = text.substring(0, 200);
    
    // Generate random values for the meme properties
    const nullRatio = Math.random() * 0.5; // 0-0.5 range
    const culturalStrength = 0.1 + Math.random() * 0.3; // 0.1-0.4 range
    
    // Generate random empathy scores
    const empathyScores = {
      golden: 0.6 + Math.random() * 0.4, // 0.6-1.0 range
      silver: 0.6 + Math.random() * 0.4, // 0.6-1.0 range
      platinum: 0.5 + Math.random() * 0.5, // 0.5-1.0 range
      love: 0.4 + Math.random() * 0.6, // 0.4-1.0 range
    };
    
    // Generate random boundary definition
    const boundaryType = Math.random() > 0.7 ? 'rigid' as const : 
                         Math.random() > 0.5 ? 'permeable' as const : 
                         'fluid' as const;
    
    const boundaryDefinition = {
      type: boundaryType,
      description: `Boundary extracted from text analysis`,
      inclusionCriteria: ['positive-impact', 'conscious-awareness', 'empathetic-response'],
      exclusionCriteria: ['harm', 'exploitation', 'zero-sum-thinking'],
      scalarValue: 0.6 + Math.random() * 0.4, // 0.6-1.0 range
    };
    
    // Extract negations (simulated)
    const negations = [
      'zero-sum thinking',
      'exploitation',
      'short-term focus',
      'self-centeredness'
    ];
    
    // Create the meme object
    const meme: Meme = {
      id,
      name,
      description,
      category: MemeCategory.LLM_DISCOVERED,
      nullRatio,
      empathyScores,
      boundaryType: `${boundaryDefinition.type} I/Not-I boundary`,
      boundaryDefinition,
      eoqScore: 0, // Will be calculated by the EOQ calculator
      culturalStrength,
      negations,
      influences: [],
      refinementHistory: [],
      position: {
        x: (Math.random() * 4) - 2, // -2 to 2
        y: (Math.random() * 4) - 2, // -2 to 2
        z: (Math.random() * 4) - 2, // -2 to 2
      },
      color: this.getRandomColor(),
      size: 0.8 + Math.random() * 0.7, // 0.8-1.5 range
      createdAt: new Date(),
      lastAnalyzed: new Date(),
      source: MemeSource.SOCIAL_MEDIA_ANALYSIS,
    };
    
    return meme;
  }
  
  /**
   * Generate a random color
   */
  private static getRandomColor(): string {
    const colors = [
      '#3B82F6', // blue
      '#10B981', // green
      '#8B5CF6', // purple
      '#F59E0B', // amber
      '#EC4899', // pink
      '#06B6D4', // cyan
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  /**
   * In a real implementation, this would call an LLM to optimize a meme
   */
  static async optimizeMeme(meme: Meme): Promise<Meme> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create an optimized version of the meme
    const optimizedMeme: Meme = {
      ...meme,
      id: `optimized-${meme.id}`,
      name: `Optimized: ${meme.name}`,
      description: `An optimized version of the original meme: ${meme.description}`,
      category: MemeCategory.PROPOSED_OPTIMIZED,
      nullRatio: Math.max(0.1, meme.nullRatio - 0.2), // Reduce nullness
      empathyScores: {
        golden: Math.min(1, meme.empathyScores.golden + 0.2),
        silver: Math.min(1, meme.empathyScores.silver + 0.1),
        platinum: Math.min(1, meme.empathyScores.platinum + 0.15),
        love: Math.min(1, meme.empathyScores.love + 0.25),
      },
      boundaryDefinition: {
        ...meme.boundaryDefinition,
        type: 'fluid', // Always make boundaries more fluid
        scalarValue: Math.min(1, meme.boundaryDefinition.scalarValue + 0.3),
        description: `Optimized boundary with increased fluidity and inclusivity`,
      },
      culturalStrength: Math.max(0.1, meme.culturalStrength - 0.3), // Reduce cultural strength for more adaptability
      color: '#10B981', // Always green for optimized memes
      createdAt: new Date(),
      lastAnalyzed: new Date(),
      source: MemeSource.GENETIC_ALGORITHM,
    };
    
    return optimizedMeme;
  }
}
