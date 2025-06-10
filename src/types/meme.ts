import { BoundaryDefinition, EmpathyTensor } from './nn-logic';

export interface Meme {
  id: string;
  name: string;
  description: string;
  category: MemeCategory;
  
  // Core N/NN Properties
  nullRatio: number;
  empathyScores: EmpathyTensor;
  boundaryType: string;
  boundaryDefinition: BoundaryDefinition;
  
  // Calculated Metrics
  eoqScore: number;
  culturalStrength: number;
  
  // Relationship Mapping
  negations: string[];
  influences: MemeInfluence[];
  refinementHistory: MemeEvolution[];
  
  // Visualization Properties
  position: Vector3D;
  color: string;
  size: number;
  
  // Metadata
  createdAt: Date;
  lastAnalyzed: Date;
  source: MemeSource;
}

export interface MemeInfluence {
  targetConceptId: string;
  targetConceptName: string;
  influenceStrength: number; // 0-1
  influenceType: InfluenceType;
  pathways: string[];
  empathyImpact: number; // Can be negative
}

export interface MemeEvolution {
  timestamp: Date;
  previousVersion: Partial<Meme>;
  changeTrigger: string;
  improvementVector: string[];
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export enum MemeCategory {
  CURRENT_PROBLEMATIC = 'current',
  PROPOSED_OPTIMIZED = 'proposed', 
  LLM_DISCOVERED = 'discovered',
  GENETICALLY_EVOLVED = 'evolved'
}

export enum InfluenceType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  DISTORTIVE = 'distortive',
  TRANSFORMATIVE = 'transformative'
}

export enum MemeSource {
  MANUAL_ENTRY = 'manual',
  SOCIAL_MEDIA_ANALYSIS = 'social_media',
  LITERATURE_ANALYSIS = 'literature',
  CULTURAL_OBSERVATION = 'cultural',
  GENETIC_ALGORITHM = 'evolved'
}

// EOQ Calculation interface
export interface EOQFactors {
  empathyWeight: number;
  nullnessWeight: number;
  boundaryWeight: number;
  refinementWeight: number;
  culturalWeight: number;
}

export interface EOQResult {
  totalScore: number;
  componentScores: {
    empathy: number;
    certainty: number;
    boundaryPermeability: number;
    refinementVelocity: number;
    culturalCompatibility: number;
  };
  recommendedImprovements: string[];
}
