export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'local';
  apiKey?: string;
  baseUrl?: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface ExternalDataSource {
  name: string;
  type: 'social_media' | 'news' | 'academic' | 'forum';
  apiKey?: string;
  baseUrl: string;
  enabled: boolean;
}

export const defaultLLMConfig: LLMConfig = {
  provider: 'openai',
  model: 'gpt-4',
  maxTokens: 2000,
  temperature: 0.7,
};

export const defaultDataSources: ExternalDataSource[] = [
  {
    name: 'Reddit',
    type: 'social_media',
    baseUrl: 'https://www.reddit.com/api/v1',
    enabled: false,
  },
  {
    name: 'Twitter/X',
    type: 'social_media',
    baseUrl: 'https://api.twitter.com/2',
    enabled: false,
  },
  {
    name: 'News API',
    type: 'news',
    baseUrl: 'https://newsapi.org/v2',
    enabled: false,
  },
  {
    name: 'ArXiv',
    type: 'academic',
    baseUrl: 'https://export.arxiv.org/api',
    enabled: true, // No API key required
  },
];

export class LLMConfigManager {
  private static config: LLMConfig = { ...defaultLLMConfig };
  private static dataSources: ExternalDataSource[] = [...defaultDataSources];

  static setConfig(newConfig: Partial<LLMConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  static getConfig(): LLMConfig {
    return { ...this.config };
  }

  static setDataSource(name: string, updates: Partial<ExternalDataSource>) {
    const index = this.dataSources.findIndex(ds => ds.name === name);
    if (index !== -1) {
      this.dataSources[index] = { ...this.dataSources[index], ...updates };
    }
  }

  static getDataSources(): ExternalDataSource[] {
    return [...this.dataSources];
  }

  static getEnabledDataSources(): ExternalDataSource[] {
    return this.dataSources.filter(ds => ds.enabled);
  }
}
