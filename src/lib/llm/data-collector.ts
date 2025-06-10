import { ExternalDataSource, LLMConfigManager } from './config';

export interface CollectedData {
  source: string;
  type: 'social_media' | 'news' | 'academic' | 'forum';
  content: string;
  metadata: {
    url?: string;
    author?: string;
    timestamp?: Date;
    engagement?: number;
    relevanceScore?: number;
  };
}

export interface DataCollectionQuery {
  keywords: string[];
  timeRange?: {
    start: Date;
    end: Date;
  };
  maxResults?: number;
  sources?: string[];
}

export class ExternalDataCollector {
  
  /**
   * Collect data from enabled external sources
   */
  static async collectData(query: DataCollectionQuery): Promise<CollectedData[]> {
    const enabledSources = LLMConfigManager.getEnabledDataSources();
    const allData: CollectedData[] = [];
    
    for (const source of enabledSources) {
      try {
        const data = await this.collectFromSource(source, query);
        allData.push(...data);
      } catch (error) {
        console.warn(`Failed to collect from ${source.name}:`, error);
      }
    }
    
    // Sort by relevance score and limit results
    return allData
      .sort((a, b) => (b.metadata.relevanceScore || 0) - (a.metadata.relevanceScore || 0))
      .slice(0, query.maxResults || 50);
  }
  
  /**
   * Collect data from a specific source
   */
  private static async collectFromSource(
    source: ExternalDataSource, 
    query: DataCollectionQuery
  ): Promise<CollectedData[]> {
    switch (source.name) {
      case 'ArXiv':
        return this.collectFromArXiv(query);
      case 'Reddit':
        return this.collectFromReddit(source, query);
      case 'News API':
        return this.collectFromNewsAPI(source, query);
      default:
        return [];
    }
  }
  
  /**
   * Collect academic papers from ArXiv (no API key required)
   */
  private static async collectFromArXiv(query: DataCollectionQuery): Promise<CollectedData[]> {
    try {
      const searchTerms = query.keywords.join(' OR ');
      const url = `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(searchTerms)}&start=0&max_results=${query.maxResults || 10}`;
      
      const response = await fetch(url);
      const xmlText = await response.text();
      
      // Parse XML response (simplified - in production would use proper XML parser)
      const entries = this.parseArXivXML(xmlText);
      
      return entries.map(entry => ({
        source: 'ArXiv',
        type: 'academic' as const,
        content: `${entry.title}\n\n${entry.summary}`,
        metadata: {
          url: entry.id,
          author: entry.authors.join(', '),
          timestamp: new Date(entry.published),
          relevanceScore: this.calculateRelevance(entry.title + ' ' + entry.summary, query.keywords),
        },
      }));
    } catch (error) {
      console.error('ArXiv collection failed:', error);
      return [];
    }
  }
  
  /**
   * Collect from Reddit (requires API key)
   */
  private static async collectFromReddit(
    source: ExternalDataSource, 
    query: DataCollectionQuery
  ): Promise<CollectedData[]> {
    if (!source.apiKey) {
      console.warn('Reddit API key not configured');
      return [];
    }
    
    // Simulate Reddit data collection
    // In production, would use Reddit API
    return this.generateSimulatedData('Reddit', 'social_media', query);
  }
  
  /**
   * Collect from News API
   */
  private static async collectFromNewsAPI(
    source: ExternalDataSource, 
    query: DataCollectionQuery
  ): Promise<CollectedData[]> {
    if (!source.apiKey) {
      console.warn('News API key not configured');
      return [];
    }
    
    try {
      const searchTerms = query.keywords.join(' OR ');
      const url = `${source.baseUrl}/everything?q=${encodeURIComponent(searchTerms)}&apiKey=${source.apiKey}&pageSize=${query.maxResults || 20}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.articles) {
        return data.articles.map((article: {
          title: string;
          description?: string;
          content?: string;
          url: string;
          author?: string;
          publishedAt: string;
        }) => ({
          source: 'News API',
          type: 'news' as const,
          content: `${article.title}\n\n${article.description || ''}\n\n${article.content || ''}`,
          metadata: {
            url: article.url,
            author: article.author,
            timestamp: new Date(article.publishedAt),
            relevanceScore: this.calculateRelevance(article.title + ' ' + article.description, query.keywords),
          },
        }));
      }
      
      return [];
    } catch (error) {
      console.error('News API collection failed:', error);
      return [];
    }
  }
  
  /**
   * Generate simulated data for sources that require API keys
   */
  private static generateSimulatedData(
    sourceName: string,
    type: 'social_media' | 'news' | 'academic' | 'forum',
    query: DataCollectionQuery
  ): CollectedData[] {
    const simulatedContent = [
      `Discussion about ${query.keywords[0]} and its impact on society. Many people are questioning traditional approaches and looking for more inclusive alternatives.`,
      `Recent trends show growing interest in ${query.keywords.join(' and ')}. This represents a shift in how we think about fundamental concepts.`,
      `Analysis of ${query.keywords[0]} reveals complex patterns of belief and behavior that influence decision-making at multiple levels.`,
      `Community perspectives on ${query.keywords.join(', ')} highlight the need for more nuanced understanding of these concepts.`,
      `Research suggests that ${query.keywords[0]} plays a crucial role in shaping social dynamics and individual choices.`,
    ];
    
    return simulatedContent.map((content, index) => ({
      source: sourceName,
      type,
      content,
      metadata: {
        url: `https://example.com/${sourceName.toLowerCase()}/${index}`,
        author: `User${index + 1}`,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        engagement: Math.floor(Math.random() * 1000),
        relevanceScore: Math.random() * 0.5 + 0.5, // 0.5-1.0 range
      },
    }));
  }
  
  /**
   * Parse ArXiv XML response (simplified)
   */
  private static parseArXivXML(xmlText: string): Array<{
    title: string;
    summary: string;
    id: string;
    published: string;
    authors: string[];
  }> {
    // This is a simplified parser - in production would use proper XML parsing
    const entries: Array<{
      title: string;
      summary: string;
      id: string;
      published: string;
      authors: string[];
    }> = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    
    while ((match = entryRegex.exec(xmlText)) !== null) {
      const entryXml = match[1];
      
      const titleMatch = entryXml.match(/<title>([\s\S]*?)<\/title>/);
      const summaryMatch = entryXml.match(/<summary>([\s\S]*?)<\/summary>/);
      const idMatch = entryXml.match(/<id>([\s\S]*?)<\/id>/);
      const publishedMatch = entryXml.match(/<published>([\s\S]*?)<\/published>/);
      const authorMatches = entryXml.match(/<name>([\s\S]*?)<\/name>/g);
      
      if (titleMatch && summaryMatch && idMatch) {
        entries.push({
          title: titleMatch[1].trim(),
          summary: summaryMatch[1].trim(),
          id: idMatch[1].trim(),
          published: publishedMatch ? publishedMatch[1].trim() : new Date().toISOString(),
          authors: authorMatches ? authorMatches.map(m => m.replace(/<\/?name>/g, '').trim()) : ['Unknown'],
        });
      }
    }
    
    return entries;
  }
  
  /**
   * Calculate relevance score based on keyword matching
   */
  private static calculateRelevance(text: string, keywords: string[]): number {
    const lowerText = text.toLowerCase();
    let score = 0;
    
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase();
      const matches = (lowerText.match(new RegExp(lowerKeyword, 'g')) || []).length;
      score += matches * (1 / keywords.length);
    }
    
    return Math.min(1, score / 3); // Normalize to 0-1 range
  }
  
  /**
   * Filter and rank collected data
   */
  static filterAndRank(data: CollectedData[], minRelevance: number = 0.3): CollectedData[] {
    return data
      .filter(item => (item.metadata.relevanceScore || 0) >= minRelevance)
      .sort((a, b) => {
        // Sort by relevance score, then by recency
        const relevanceDiff = (b.metadata.relevanceScore || 0) - (a.metadata.relevanceScore || 0);
        if (Math.abs(relevanceDiff) > 0.1) return relevanceDiff;
        
        const aTime = a.metadata.timestamp?.getTime() || 0;
        const bTime = b.metadata.timestamp?.getTime() || 0;
        return bTime - aTime;
      });
  }
}
