import { validateResponseFormat } from './validators';
import { formatResponse } from './formatter';

export function processResponse(content: string, isAssessment: boolean): string {
  // Initial formatting
  let processedContent = formatResponse(content, isAssessment);

  // Validate the formatted content
  try {
    const validation = validateResponseFormat(processedContent, isAssessment);

    if (!validation.isValid) {
      console.warn('Response validation warnings:', validation.errors);
    }
  } catch (error) {
    console.warn('Validation error:', error);
  }

  return processedContent;
}