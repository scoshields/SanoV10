export interface Note {
  id: string;
  content: string;
  originalContent?: string;
  processedContent?: string;
  isProcessing: boolean;
  error?: string;
  additionalInstructions?: string;
}

export interface ProcessingOptions {
  prompt: string;
  content: string;
  additionalInstructions?: string;
  originalContent?: string;
}

export interface NoteFormData {
  content: string;
  selectedTherapies: string[];
  noteType: 'session' | 'assessment';
  isGuided: boolean;
  guidedResponses?: Record<string, string>;
  customInstructions?: string;
}

export interface GuidedQuestion {
  id: string;
  text: string;
  category: string;
}