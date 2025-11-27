/**
 * Example Usage of Game Rank Service
 * ตัวอย่างการใช้งาน gameRankService
 */

import { gameRankService, handleApiError, validateApiConfig } from '../services/index.js';

/**
 * Example: Get Arena Ranking
 */
export async function exampleGetArenaRanking() {
  try {
    console.log('=== Getting Arena Ranking ===');
    const arenaData = await gameRankService.getArenaRanking();
    console.log('Arena Ranking Data:', arenaData);
    return arenaData;
  } catch (error) {
    const errorResponse = handleApiError(error, 'Arena Ranking');
    console.error('Arena Ranking Error:', errorResponse);
    return errorResponse;
  }
}

/**
 * Example: Get Level Ranking
 */
export async function exampleGetLevelRanking() {
  try {
    console.log('=== Getting Level Ranking ===');
    const levelData = await gameRankService.getLevelRanking();
    console.log('Level Ranking Data:', levelData);
    return levelData;
  } catch (error) {
    const errorResponse = handleApiError(error, 'Level Ranking');
    console.error('Level Ranking Error:', errorResponse);
    return errorResponse;
  }
}

/**
 * Example: Get All Rankings at once
 */
export async function exampleGetAllRankings() {
  try {
    console.log('=== Getting All Rankings ===');
    const allData = await gameRankService.getAllRankings();
    console.log('All Rankings Data:', allData);
    return allData;
  } catch (error) {
    const errorResponse = handleApiError(error, 'All Rankings');
    console.error('All Rankings Error:', errorResponse);
    return errorResponse;
  }
}

/**
 * Example: Validate API Configuration before making calls
 */
export function exampleValidateConfig() {
  console.log('=== Validating API Configuration ===');
  const validation = validateApiConfig();
  
  if (validation.isValid) {
    console.log('✅ API Configuration is valid');
    console.log('Config:', validation.config);
  } else {
    console.error('❌ API Configuration has errors:');
    validation.errors.forEach(error => console.error(`- ${error}`));
  }
  
  return validation;
}

/**
 * Example: Complete workflow with error handling
 */
export async function exampleCompleteWorkflow() {
  console.log('=== Complete API Workflow Example ===');
  
  // Step 1: Validate configuration
  const configValidation = exampleValidateConfig();
  if (!configValidation.isValid) {
    console.error('Cannot proceed due to configuration errors');
    return { success: false, errors: configValidation.errors };
  }
  
  // Step 2: Get all rankings
  try {
    const results = await exampleGetAllRankings();
    console.log('✅ Workflow completed successfully');
    return { success: true, data: results };
  } catch (error) {
    console.error('❌ Workflow failed:', error);
    return { success: false, error };
  }
}

// Export all examples for easy testing
export const examples = {
  arenaRanking: exampleGetArenaRanking,
  levelRanking: exampleGetLevelRanking,
  allRankings: exampleGetAllRankings,
  validateConfig: exampleValidateConfig,
  completeWorkflow: exampleCompleteWorkflow
};
