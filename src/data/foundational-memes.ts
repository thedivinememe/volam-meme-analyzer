import { InfluenceType, Meme, MemeCategory, MemeSource } from '../types/meme';

export const foundationalMemes: Meme[] = [
  // Current Problematic Memes
  {
    id: 'god-divine-authority',
    name: 'God/Divine Authority',
    description: 'Supreme being or cosmic order that provides meaning and moral authority',
    category: MemeCategory.CURRENT_PROBLEMATIC,
    nullRatio: 0.85,
    empathyScores: {
      golden: 0.6,
      silver: 0.4,
      platinum: 0.7,
      love: 0.8
    },
    boundaryType: 'Rigid I/Not-I (believers/heretics)',
    boundaryDefinition: {
      type: 'rigid',
      description: 'Divides world into believers vs non-believers',
      inclusionCriteria: ['believers', 'faithful', 'chosen'],
      exclusionCriteria: ['atheists', 'heretics', 'infidels', 'pagans'],
      scalarValue: 0.2
    },
    eoqScore: 0.52,
    culturalStrength: 0.9,
    negations: ['atheism', 'materialism', 'human-authority', 'meaninglessness'],
    influences: [
      {
        targetConceptId: 'morality',
        targetConceptName: 'Moral Decision Making',
        influenceStrength: 0.9,
        influenceType: InfluenceType.TRANSFORMATIVE,
        pathways: ['divine-command-theory', 'sacred-texts', 'religious-authority'],
        empathyImpact: 0.3 // Can justify harm to out-group
      },
      {
        targetConceptId: 'meaning',
        targetConceptName: 'Life Purpose',
        influenceStrength: 0.8,
        influenceType: InfluenceType.POSITIVE,
        pathways: ['divine-plan', 'afterlife-purpose', 'service-to-god'],
        empathyImpact: 0.7
      }
    ],
    refinementHistory: [],
    position: { x: -2, y: 0, z: 0 },
    color: '#8B5CF6',
    size: 1.2,
    createdAt: new Date('2024-01-01'),
    lastAnalyzed: new Date(),
    source: MemeSource.MANUAL_ENTRY
  },

  {
    id: 'money-value-measure',
    name: 'Money as Value Measure',
    description: 'Human worth and societal contribution measured primarily through monetary accumulation',
    category: MemeCategory.CURRENT_PROBLEMATIC,
    nullRatio: 0.3,
    empathyScores: {
      golden: 0.2,
      silver: 0.3,
      platinum: 0.1,
      love: 0.1
    },
    boundaryType: 'Hierarchical I/Not-I (wealthy/poor)',
    boundaryDefinition: {
      type: 'rigid',
      description: 'Creates economic class divisions',
      inclusionCriteria: ['wealthy', 'successful', 'valuable'],
      exclusionCriteria: ['poor', 'unsuccessful', 'worthless'],
      scalarValue: 0.1
    },
    eoqScore: 0.18,
    culturalStrength: 0.95,
    negations: ['gift-economy', 'time-banking', 'mutual-aid', 'intrinsic-worth'],
    influences: [
      {
        targetConceptId: 'self-worth',
        targetConceptName: 'Personal Value',
        influenceStrength: 0.95,
        influenceType: InfluenceType.DISTORTIVE,
        pathways: ['salary-status', 'net-worth', 'consumption-display'],
        empathyImpact: -0.4 // Actively harmful to collective wellbeing
      },
      {
        targetConceptId: 'resource-allocation',
        targetConceptName: 'Resource Distribution',
        influenceStrength: 0.9,
        influenceType: InfluenceType.NEGATIVE,
        pathways: ['market-mechanisms', 'profit-maximization', 'scarcity-pricing'],
        empathyImpact: -0.6
      }
    ],
    refinementHistory: [],
    position: { x: 2, y: -2, z: 0 },
    color: '#EF4444',
    size: 1.5,
    createdAt: new Date('2024-01-01'),
    lastAnalyzed: new Date(),
    source: MemeSource.MANUAL_ENTRY
  },

  // Proposed N/NN Optimized Memes
  {
    id: 'existence-optimization',
    name: 'Existence Optimization',
    description: 'The purpose of consciousness is to optimize existence patterns for collective flourishing',
    category: MemeCategory.PROPOSED_OPTIMIZED,
    nullRatio: 0.2,
    empathyScores: {
      golden: 0.95,
      silver: 0.9,
      platinum: 0.85,
      love: 0.9
    },
    boundaryType: 'Inclusive I/Not-I (conscious beings/unconscious patterns)',
    boundaryDefinition: {
      type: 'fluid',
      description: 'Includes all conscious beings, works with unconscious patterns',
      inclusionCriteria: ['conscious-beings', 'sentient-life', 'aware-systems'],
      exclusionCriteria: ['unconscious-destruction', 'pattern-chaos'],
      scalarValue: 0.9
    },
    eoqScore: 0.91,
    culturalStrength: 0.1,
    negations: ['pure-selfishness', 'nihilistic-destruction', 'zero-sum-thinking', 'extraction-mindset'],
    influences: [
      {
        targetConceptId: 'decision-making',
        targetConceptName: 'Choice Architecture',
        influenceStrength: 0.9,
        influenceType: InfluenceType.TRANSFORMATIVE,
        pathways: ['collective-benefit-calculation', 'long-term-thinking', 'empathy-optimization'],
        empathyImpact: 0.9
      },
      {
        targetConceptId: 'technology-development',
        targetConceptName: 'Innovation Direction',
        influenceStrength: 0.8,
        influenceType: InfluenceType.POSITIVE,
        pathways: ['regenerative-tech', 'consciousness-enhancement', 'cooperative-tools'],
        empathyImpact: 0.85
      }
    ],
    refinementHistory: [],
    position: { x: -2, y: 2, z: 2 },
    color: '#10B981',
    size: 1.3,
    createdAt: new Date('2024-01-01'),
    lastAnalyzed: new Date(),
    source: MemeSource.MANUAL_ENTRY
  },

  {
    id: 'regenerative-contribution',
    name: 'Regenerative Contribution',
    description: 'Value measured by net positive impact on existence rather than extraction or accumulation',
    category: MemeCategory.PROPOSED_OPTIMIZED,
    nullRatio: 0.25,
    empathyScores: {
      golden: 0.9,
      silver: 0.85,
      platinum: 0.9,
      love: 0.95
    },
    boundaryType: 'Dynamic I/Not-I (contributors/extractors, context-dependent)',
    boundaryDefinition: {
      type: 'fluid',
      description: 'Boundaries shift based on impact patterns, not fixed identity',
      inclusionCriteria: ['net-positive-impact', 'regenerative-patterns', 'life-supporting'],
      exclusionCriteria: ['extraction-only', 'destructive-patterns', 'life-diminishing'],
      scalarValue: 0.85
    },
    eoqScore: 0.92,
    culturalStrength: 0.08,
    negations: ['extractive-capitalism', 'hoarding-behavior', 'zero-sum-competition', 'disposable-thinking'],
    influences: [
      {
        targetConceptId: 'economic-systems',
        targetConceptName: 'Value Exchange',
        influenceStrength: 0.95,
        influenceType: InfluenceType.TRANSFORMATIVE,
        pathways: ['contribution-metrics', 'regenerative-economics', 'gift-culture-elements'],
        empathyImpact: 0.9
      },
      {
        targetConceptId: 'personal-fulfillment',
        targetConceptName: 'Life Satisfaction',
        influenceStrength: 0.8,
        influenceType: InfluenceType.POSITIVE,
        pathways: ['meaning-through-contribution', 'interconnection-awareness', 'legacy-building'],
        empathyImpact: 0.85
      }
    ],
    refinementHistory: [],
    position: { x: 2, y: 2, z: 2 },
    color: '#059669',
    size: 1.4,
    createdAt: new Date('2024-01-01'),
    lastAnalyzed: new Date(),
    source: MemeSource.MANUAL_ENTRY
  }
];

export const conceptNodes = [
  {
    id: 'morality',
    name: 'Moral Decision Making',
    description: 'Framework for determining right and wrong actions',
    nullness: 0.4,
    position: { x: -1, y: 1, z: 0 }
  },
  {
    id: 'self-worth',
    name: 'Personal Value',
    description: 'How individuals assess their own worth',
    nullness: 0.6,
    position: { x: 1, y: -1, z: 0 }
  },
  {
    id: 'resource-allocation',
    name: 'Resource Distribution',
    description: 'How societies distribute available resources',
    nullness: 0.3,
    position: { x: 0, y: -2, z: 1 }
  },
  {
    id: 'decision-making',
    name: 'Choice Architecture',
    description: 'How decisions are structured and made',
    nullness: 0.35,
    position: { x: -1, y: 1, z: 1 }
  },
  {
    id: 'technology-development',
    name: 'Innovation Direction',
    description: 'What kinds of technology get developed and why',
    nullness: 0.5,
    position: { x: 0, y: 0, z: 2 }
  }
];
