import { 
  basePromptTemplate,
  assessmentPromptTemplate,
  sessionNoteFormat,
  assessmentNoteFormat
} from './basePrompt';
import { GUIDED_QUESTIONS } from '../guidedQuestions';
import { ASSESSMENT_QUESTIONS } from '../assessmentQuestions';
import { THERAPY_PROMPTS } from '../therapy/prompts';
import type { NoteFormData } from '../../types';

export function buildPrompt(
  selectedTherapies: string[] = [],
  noteType: 'session' | 'assessment',
  customInstructions?: string,
  guidedResponses?: Record<string, string>
): string {
  // Select the appropriate base template and format
  let finalPrompt = noteType === 'assessment' ? assessmentPromptTemplate : basePromptTemplate;
  let formatTemplate = noteType === 'assessment' ? assessmentNoteFormat : sessionNoteFormat;
  const questions = noteType === 'assessment' ? ASSESSMENT_QUESTIONS : GUIDED_QUESTIONS;

  // Add therapy-specific instructions for selected therapies
  if (noteType === 'session' && selectedTherapies?.length > 0) {
    const therapyInstructions = selectedTherapies
      .map(typeId => THERAPY_PROMPTS[typeId])
      .filter(Boolean)
      .join('\n\n');
    
    if (therapyInstructions) {
      finalPrompt += `\n\nTherapy-Specific Requirements:\n${therapyInstructions}`;
    }
  }

  // Add guided responses if provided
  if (guidedResponses) {
    let guidedContent = '';
    Object.entries(guidedResponses).forEach(([id, response]) => {
      if (response.trim()) {
        const question = questions.find(q => q.id === id);
        if (question) {
          guidedContent += `\n${question.category}:\n${response.trim()}\n`;
        }
      }
    });
    
    if (guidedContent) {
      const prefix = noteType === 'assessment' 
        ? 'Please generate a clinical assessment based on the following information:'
        : 'Please generate clinical notes based on the following structured information:';
      finalPrompt = `${prefix}\n${guidedContent}\n${finalPrompt}`;
    }
  }

  // Add custom instructions if provided
  if (customInstructions?.trim()) {
    finalPrompt += `\n\nAdditional Custom Requirements:\n${customInstructions.trim()}`;
  }

  // Add the response format at the end
  finalPrompt += `\n\nFormat the response in the following structure:\n${formatTemplate}`;

  return finalPrompt;
}