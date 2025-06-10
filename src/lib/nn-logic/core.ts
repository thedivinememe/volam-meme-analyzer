import { Context, NullNotNullState, Refinement, StateMetadata } from '../../types/nn-logic';

export class NNLogicEngine {
  
  /**
   * Create a new N/NN state with given nullness
   */
  static createState<T>(
    value: T | null, 
    nullness: number,
    metadata: Partial<StateMetadata> = {}
  ): NullNotNullState<T> {
    return {
      value,
      nullness: Math.max(0, Math.min(1, nullness)), // Clamp to [0,1]
      metadata: {
        refinementHistory: [],
        lastModified: new Date(),
        contextualFactors: new Map(),
        empathyTensor: { golden: 0, silver: 0, platinum: 0, love: 0 },
        boundaryDefinition: {
          type: 'fluid',
          description: 'Undefined boundary',
          inclusionCriteria: [],
          exclusionCriteria: [],
          scalarValue: 1.0 // Fully fluid by default
        },
        ...metadata
      }
    };
  }

  /**
   * Refine a state using context (monotonic - nullness can only decrease)
   */
  static refine<T>(
    state: NullNotNullState<T>, 
    context: Context
  ): NullNotNullState<T> {
    const nullnessReduction = Math.min(state.nullness, context.informationGain);
    const newNullness = state.nullness - nullnessReduction;
    
    const refinement: Refinement = {
      timestamp: Date.now(),
      contextId: context.id,
      nullnessReduction,
      informationGain: `Context: ${context.id}, Gain: ${context.informationGain}`
    };

    return {
      ...state,
      value: state.value ?? context.newValue as T,
      nullness: newNullness,
      metadata: {
        ...state.metadata,
        lastModified: new Date(),
        refinementHistory: [...state.metadata.refinementHistory, refinement],
        contextualFactors: new Map([
          ...state.metadata.contextualFactors,
          [context.id, context]
        ])
      }
    };
  }

  /**
   * Apply X-Shaped Hole principle - define through negation
   */
  static defineByNegation<T>(
    universalSet: T[],
    negations: T[],
    conceptName: string
  ): NullNotNullState<T[]> {
    const remainingSet = universalSet.filter(item => !negations.includes(item));
    const nullness = remainingSet.length / universalSet.length; // More remaining = more uncertain
    
    return this.createState(
      remainingSet,
      nullness,
      {
        boundaryDefinition: {
          type: 'rigid',
          description: `${conceptName} defined by excluding: ${negations.join(', ')}`,
          inclusionCriteria: remainingSet.map(String),
          exclusionCriteria: negations.map(String),
          scalarValue: 0.2 // Rigid by default for negation-based definitions
        }
      }
    );
  }

  /**
   * Calculate empathy impact between agents
   */
  static calculateEmpathy(
    sourceAgent: string,
    targetAgent: string, 
    action: string,
    context: Context
  ): number {
    // Simplified empathy calculation
    // In full implementation, this would be much more sophisticated
    
    const culturalCompatibility = context.culturalFactors.individualismIndex;
    const timeHorizonImpact = context.temporalFactors.timeHorizon === 'generational' ? 1.2 : 1.0;
    
    // Base empathy calculation (placeholder)
    const baseEmpathy = 0.5; // Would be calculated from action impact
    
    return Math.min(1, baseEmpathy * culturalCompatibility * timeHorizonImpact);
  }

  /**
   * Apply the Golden Loop validation
   */
  static applyGoldenLoop(concept: { 
    nullness: number; 
    empathyScores?: { 
      golden: number;
      [key: string]: number;
    } 
  }): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // 1. Existence check
    if (!concept || concept.nullness > 0.9) {
      issues.push("Concept insufficiently defined for Golden Loop analysis");
    }
    
    // 2. Epistemic humility check
    if (concept.nullness < 0.1) {
      issues.push("Overconfidence detected - healthy uncertainty missing");
    }
    
    // 3. Nihilism acknowledgment (all patterns possible)
    // This is philosophical - always passes
    
    // 4. Faith in ordered patterns
    if (!concept.empathyScores || Object.values(concept.empathyScores).every((v: number) => v < 0.1)) {
      issues.push("No empathetic ordering detected");
    }
    
    // 5. Golden Rule optimization
    if (concept.empathyScores && concept.empathyScores.golden < 0.5) {
      issues.push("Fails Golden Rule reciprocity test");
    }
    
    // 6. Violation check - if any issues, loop back
    return {
      valid: issues.length === 0,
      issues
    };
  }
}
