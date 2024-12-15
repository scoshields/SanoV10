import { basePromptTemplate, formatResponse } from './basePrompt';
import { modalityPrompts } from './modalityPrompts';

const createPrompt = (basePrompt: string, modalityPrompt: string = '') => {
  return `${basePrompt}${modalityPrompt}${formatResponse}`;
};

export const PROMPT_OPTIONS = {
  standard: createPrompt(basePromptTemplate),
  emdr: createPrompt(basePromptTemplate, modalityPrompts.emdr),
  ifs: createPrompt(basePromptTemplate, modalityPrompts.ifs),
  cbt: createPrompt(basePromptTemplate, modalityPrompts.cbt)
} as const;

export type PromptType = keyof typeof PROMPT_OPTIONS;

export const DEFAULT_PROMPT_TYPE: PromptType = 'standard';

export const FORMAT_LABELS: Record<PromptType, string> = {
  standard: 'Standard Clinical Format',
  emdr: 'EMDR Session Documentation',
  ifs: 'Internal Family Systems Notes',
  cbt: 'Cognitive Behavioral Therapy Notes'
};

export const FORMAT_DESCRIPTIONS: Record<PromptType, string> = {
  standard: 'Comprehensive clinical documentation covering presenting problems, status changes, interventions, and responses in a structured format suitable for general therapy sessions.',
  emdr: 'Specialized format for EMDR sessions, including target memory selection, SUDs levels, bilateral stimulation type, and processing outcomes.',
  ifs: 'Detailed documentation for Internal Family Systems therapy, focusing on parts work, unburdening processes, and system interactions.',
  cbt: 'Structured notes for CBT sessions, documenting cognitive distortions, behavioral experiments, homework assignments, and rational responses.'
};