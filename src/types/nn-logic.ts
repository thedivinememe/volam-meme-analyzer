// Core N/NN Logic type definitions
export interface NullNotNullState<T> {
  value: T | null;
  nullness: number; // 0-1, where 1 = completely undefined
  metadata: StateMetadata;
}

export interface StateMetadata {
  refinementHistory: Refinement[];
  lastModified: Date;
  contextualFactors: Map<string, unknown>;
  empathyTensor: EmpathyTensor;
  boundaryDefinition: BoundaryDefinition;
}

export interface Refinement {
  timestamp: number;
  contextId: string;
  nullnessReduction: number;
  informationGain: string;
}

export interface EmpathyTensor {
  golden: number;    // Reciprocity (Do unto others)
  silver: number;    // Non-harm (Do no harm)  
  platinum: number;  // Other-centered (Do what others need)
  love: number;      // Unconditional care (Love thy neighbor)
}

export interface BoundaryDefinition {
  type: 'rigid' | 'permeable' | 'fluid';
  description: string;
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  scalarValue: number; // 0-1, where 0 = completely rigid, 1 = completely fluid
}

export interface Context {
  id: string;
  culturalFactors: CulturalContext;
  temporalFactors: TemporalContext;
  environmentalFactors: Record<string, unknown>;
  informationGain: number;
  newValue?: unknown;
}

export interface CulturalContext {
  region: string;
  valueSystem: string;
  communicationStyle: 'direct' | 'indirect';
  individualismIndex: number; // 0-1
  hierarchyTolerance: number; // 0-1
}

export interface TemporalContext {
  timeHorizon: 'immediate' | 'short' | 'medium' | 'long' | 'generational';
  urgency: number; // 0-1
  changeRate: number; // How fast the context is evolving
}
