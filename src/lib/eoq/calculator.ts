import { EOQFactors, EOQResult, Meme } from '../../types/meme';

import { EmpathyTensor } from '../../types/nn-logic';

export class EOQCalculator {
  
  private static defaultFactors: EOQFactors = {
    empathyWeight: 0.4,
    nullnessWeight: 0.25,
    boundaryWeight: 0.2,
    refinementWeight: 0.1,
    culturalWeight: 0.05
  };

  /**
   * Calculate Existence Optimization Quotient for a meme
   */
  static calculateEOQ(meme: Meme, factors: EOQFactors = this.defaultFactors): EOQResult {
    const empathyScore = this.calculateEmpathyComponent(meme.empathyScores);
    const certaintyScore = 1 - meme.nullRatio; // Higher certainty = lower nullness
    const boundaryScore = this.calculateBoundaryPermeability(meme);
    const refinementScore = this.calculateRefinementVelocity(meme);
    const culturalScore = this.calculateCulturalCompatibility(meme);

    const totalScore = 
      empathyScore * factors.empathyWeight +
      certaintyScore * factors.nullnessWeight +
      boundaryScore * factors.boundaryWeight +
      refinementScore * factors.refinementWeight +
      culturalScore * factors.culturalWeight;

    const recommendations = this.generateRecommendations(meme, {
      empathy: empathyScore,
      certainty: certaintyScore,
      boundaryPermeability: boundaryScore,
      refinementVelocity: refinementScore,
      culturalCompatibility: culturalScore
    });

    return {
      totalScore: Math.max(0, Math.min(1, totalScore)),
      componentScores: {
        empathy: empathyScore,
        certainty: certaintyScore,
        boundaryPermeability: boundaryScore,
        refinementVelocity: refinementScore,
        culturalCompatibility: culturalScore
      },
      recommendedImprovements: recommendations
    };
  }

  private static calculateEmpathyComponent(empathyScores: EmpathyTensor): number {
    // Weighted average of the four empathy dimensions
    const weights = {
      golden: 0.3,   // Reciprocity is foundational
      silver: 0.25,  // Non-harm is critical
      platinum: 0.25, // Other-focus shows maturity
      love: 0.2      // Unconditional care is ideal but harder
    };

    return (
      empathyScores.golden * weights.golden +
      empathyScores.silver * weights.silver +
      empathyScores.platinum * weights.platinum +
      empathyScores.love * weights.love
    );
  }

  private static calculateBoundaryPermeability(meme: Meme): number {
    // Analyze boundary type for inclusivity
    const boundaryScore: Record<string, number> = {
      'rigid': 0.2,      // "Us vs Them" boundaries
      'permeable': 0.7,  // Flexible but defined
      'fluid': 0.9       // Adaptive boundaries
    };

    // Use the scalar value if available, otherwise use the type-based score
    const baseScore = meme.boundaryDefinition.scalarValue !== undefined 
      ? meme.boundaryDefinition.scalarValue 
      : boundaryScore[meme.boundaryDefinition.type] || 0.5;
    
    // Bonus for inclusive criteria
    const inclusiveBonus = meme.boundaryDefinition.inclusionCriteria.length > 
                          meme.boundaryDefinition.exclusionCriteria.length ? 0.1 : 0;
    
    return Math.min(1, baseScore + inclusiveBonus);
  }

  private static calculateRefinementVelocity(meme: Meme): number {
    if (meme.refinementHistory.length === 0) return 0.5; // No history = average

    const recentRefinements = meme.refinementHistory
      .filter(r => Date.now() - r.timestamp.getTime() < 30 * 24 * 60 * 60 * 1000) // Last 30 days
      .length;

    // More recent refinements = higher adaptability
    return Math.min(1, recentRefinements / 5); // Normalize to max 5 refinements per month
  }

  private static calculateCulturalCompatibility(meme: Meme): number {
    // Simplified - in full implementation would check across multiple cultures
    return meme.culturalStrength > 0.8 ? 0.3 : // High cultural strength might mean rigid
           meme.culturalStrength > 0.5 ? 0.7 : // Medium strength suggests adaptation
           0.9; // Low strength allows for flexibility
  }

  private static generateRecommendations(
    meme: Meme, 
    scores: EOQResult['componentScores']
  ): string[] {
    const recommendations: string[] = [];

    if (scores.empathy < 0.6) {
      recommendations.push("Increase empathetic consideration - focus on collective benefit");
    }

    if (scores.certainty < 0.3) {
      recommendations.push("Reduce nullness through evidence gathering and definition clarity");
    }

    if (scores.certainty > 0.9) {
      recommendations.push("Maintain epistemic humility - acknowledge remaining uncertainties");
    }

    if (scores.boundaryPermeability < 0.5) {
      recommendations.push("Create more inclusive boundaries - reduce Us/Them divisions");
    }

    if (scores.refinementVelocity < 0.4) {
      recommendations.push("Increase adaptability - allow for evolution based on new evidence");
    }

    if (scores.culturalCompatibility < 0.5) {
      recommendations.push("Test cross-cultural applicability and adapt accordingly");
    }

    return recommendations;
  }

  /**
   * Compare two memes by EOQ
   */
  static compareMemes(meme1: Meme, meme2: Meme): {
    winner: Meme;
    advantages: string[];
    eoqDifference: number;
  } {
    const eoq1 = this.calculateEOQ(meme1);
    const eoq2 = this.calculateEOQ(meme2);
    
    const winner = eoq1.totalScore > eoq2.totalScore ? meme1 : meme2;
    const winnerEOQ = eoq1.totalScore > eoq2.totalScore ? eoq1 : eoq2;
    
    const advantages = winnerEOQ.componentScores.empathy > 0.8 ? 
      ["Higher empathy optimization"] :
      winnerEOQ.componentScores.boundaryPermeability > 0.8 ?
      ["More inclusive boundaries"] :
      ["Better overall balance"];

    return {
      winner,
      advantages,
      eoqDifference: Math.abs(eoq1.totalScore - eoq2.totalScore)
    };
  }
}
