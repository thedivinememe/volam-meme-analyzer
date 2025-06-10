# VOLaM Meme Analyzer

A comprehensive web application for analyzing foundational beliefs and cultural memes through Null/Not-Null Logic and Existence Optimization Quotient (EOQ) calculations.

## 🌟 Features

### Core Analysis Engine
- **N/NN Logic Implementation**: Advanced null/not-null state management for belief analysis
- **EOQ Calculator**: Existence Optimization Quotient scoring for meme effectiveness
- **Empathy Tensor Analysis**: Four-dimensional empathy scoring (Golden, Silver, Platinum, Love rules)
- **Boundary Definition**: Rigid, permeable, and fluid boundary type analysis
- **X-Shaped Hole Principle**: Define concepts through systematic negation

### User Interface
- **Interactive Dashboard**: Real-time meme analysis and comparison
- **3D Visualization**: Three.js-powered spatial representation of meme relationships
- **Educational Modules**: Interactive learning about N/NN Logic principles
- **Text Analysis**: Extract memes from arbitrary text using LLM integration
- **Meme Creation**: Manual meme entry with guided forms

### LLM Integration
- **Multi-Provider Support**: OpenAI, Anthropic, and local LLM compatibility
- **Enhanced Analysis**: Research-backed meme optimization suggestions
- **External Data Sources**: ArXiv, Reddit, News API, and Twitter integration
- **Configurable Settings**: Flexible API configuration and data source management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- (Optional) API keys for LLM providers and external data sources

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd volam-meme-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000` (or next available port).

### Basic Usage

1. **Explore Sample Data**: Start with the pre-loaded foundational memes on the dashboard
2. **Create New Memes**: Use the "Create New Meme" button to manually add memes
3. **Analyze Text**: Use the "Analyze Text" feature to extract memes from any text
4. **Configure LLMs**: Visit Settings to configure your preferred LLM provider
5. **Learn N/NN Logic**: Use the Education section to understand the theoretical foundation

## 📊 Core Concepts

### Null/Not-Null Logic (N/NN)
A philosophical framework for handling uncertainty and incomplete information:
- **Null Ratio**: Degree of uncertainty (0-1, where 1 = completely undefined)
- **Refinement Process**: Monotonic reduction of nullness through contextual information
- **Epistemic Humility**: Maintaining healthy uncertainty even with high confidence

### Existence Optimization Quotient (EOQ)
A composite score measuring how well a meme optimizes existence:
- **Empathy Component** (40%): Four-rule empathy tensor scoring
- **Certainty Component** (25%): Inverse of null ratio
- **Boundary Permeability** (20%): Inclusivity of meme boundaries
- **Refinement Velocity** (10%): Adaptability and evolution rate
- **Cultural Compatibility** (5%): Cross-cultural applicability

### Empathy Tensor
Four-dimensional empathy measurement:
- **Golden Rule** (30%): Reciprocity - "Do unto others as you would have them do unto you"
- **Silver Rule** (25%): Non-harm - "Do no harm"
- **Platinum Rule** (25%): Other-centered - "Do what others need"
- **Love Rule** (20%): Unconditional care - "Love thy neighbor as thyself"

## 🏗️ Architecture

### Frontend (Next.js 15)
```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Main dashboard
│   ├── analyze/           # Text analysis interface
│   ├── education/         # Learning modules
│   ├── memes/            # Meme CRUD operations
│   ├── settings/         # Configuration
│   └── visualization/    # 3D visualization
├── components/           # Reusable React components
│   ├── ui/              # Base UI components
│   ├── meme/            # Meme-specific components
│   ├── education/       # Educational components
│   └── visualization/   # 3D visualization components
├── lib/                 # Core business logic
│   ├── nn-logic/        # N/NN Logic engine
│   ├── eoq/            # EOQ calculation
│   └── llm/            # LLM integration
├── types/              # TypeScript type definitions
└── data/               # Sample data and fixtures
```

### Key Technologies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Three.js**: 3D visualization
- **Framer Motion**: Animations
- **Recharts**: Data visualization
- **Lucide React**: Icon library

## 🔧 Configuration

### LLM Providers

#### OpenAI
```typescript
{
  provider: 'openai',
  model: 'gpt-4',
  apiKey: 'your-openai-api-key',
  maxTokens: 2000,
  temperature: 0.7
}
```

#### Anthropic
```typescript
{
  provider: 'anthropic',
  model: 'claude-3-sonnet-20240229',
  apiKey: 'your-anthropic-api-key',
  maxTokens: 2000,
  temperature: 0.7
}
```

#### Local LLM
```typescript
{
  provider: 'local',
  model: 'llama-2-7b',
  baseUrl: 'http://localhost:1234',
  maxTokens: 2000,
  temperature: 0.7
}
```

### External Data Sources

Configure in Settings page or directly in `src/lib/llm/config.ts`:

- **ArXiv**: Academic papers (no API key required)
- **Reddit**: Social media discussions (requires Reddit API key)
- **News API**: News articles (requires News API key)
- **Twitter/X**: Social media posts (requires Twitter API key)

## 📚 Usage Examples

### Creating a Meme Programmatically

```typescript
import { NNLogicEngine } from '@/lib/nn-logic/core';
import { EOQCalculator } from '@/lib/eoq/calculator';

// Create a new meme with N/NN state
const meme = {
  id: 'example-meme',
  name: 'Example Belief',
  description: 'A sample foundational belief',
  nullRatio: 0.3,
  empathyScores: {
    golden: 0.8,
    silver: 0.9,
    platinum: 0.7,
    love: 0.6
  },
  // ... other properties
};

// Calculate EOQ score
const eoqResult = EOQCalculator.calculateEOQ(meme);
console.log(`EOQ Score: ${eoqResult.totalScore}`);
console.log(`Recommendations: ${eoqResult.recommendedImprovements}`);
```

### Analyzing Text with LLM

```typescript
import { EnhancedMemeAnalyzer } from '@/lib/llm/enhanced-analyzer';

const context = {
  text: "Money is the root of all evil, but we need it to survive in modern society.",
  analysisDepth: 'comprehensive',
  includeOptimization: true
};

const result = await EnhancedMemeAnalyzer.analyzeWithContext(context);
console.log(result.meme);
console.log(result.insights);
```

### Refining N/NN States

```typescript
import { NNLogicEngine } from '@/lib/nn-logic/core';

// Create initial uncertain state
const state = NNLogicEngine.createState(null, 0.8);

// Refine with contextual information
const context = {
  id: 'cultural-evidence',
  informationGain: 0.3,
  newValue: 'Refined belief based on evidence'
};

const refinedState = NNLogicEngine.refine(state, context);
console.log(`Nullness reduced from ${state.nullness} to ${refinedState.nullness}`);
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build image
docker build -t volam-meme-analyzer .

# Run container
docker run -p 3000:3000 volam-meme-analyzer
```

### Environment Variables
Create `.env.local` for production:
```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
REDDIT_API_KEY=your_reddit_key
NEWS_API_KEY=your_news_api_key
TWITTER_API_KEY=your_twitter_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure EOQ scores improve with changes

## 📖 Theoretical Background

### Null/Not-Null Logic
Based on philosophical frameworks for handling uncertainty and incomplete information. Unlike traditional binary logic, N/NN Logic acknowledges degrees of uncertainty and provides mechanisms for systematic refinement.

### Existence Optimization
The principle that conscious beings should optimize existence patterns for collective flourishing. This involves:
- Maximizing empathy and collective benefit
- Minimizing harm and extraction
- Maintaining epistemic humility
- Promoting regenerative rather than extractive patterns

### The Golden Loop
A validation framework ensuring:
1. Existence acknowledgment
2. Epistemic humility
3. Nihilism acknowledgment (all patterns possible)
4. Faith in ordered patterns
5. Golden Rule optimization
6. Violation checking and loop-back

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by philosophical frameworks for handling uncertainty
- Built with modern web technologies and best practices
- Designed for educational and research purposes
- Contributions welcome from the global community

## 📞 Support

- Create an issue for bug reports
- Start a discussion for feature requests
- Check the wiki for detailed documentation
- Join our community discussions

---

**Note**: This is an experimental framework for analyzing foundational beliefs. Results should be interpreted thoughtfully and used as a starting point for deeper philosophical inquiry rather than absolute truth.
