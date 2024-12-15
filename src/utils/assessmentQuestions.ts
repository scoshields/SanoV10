import type { GuidedQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: GuidedQuestion[] = [
  {
    id: 'demographics',
    text: 'What are the client demographics (age, background, referral source, relevant medical history)?',
    category: 'Client Demographics'
  },
  {
    id: 'presenting_concerns',
    text: 'What are the primary presenting concerns and symptoms (how do these affect daily functioning)?',
    category: 'Presenting Concerns'
  },
  {
    id: 'onset_duration',
    text: 'When did symptoms begin and what is their duration/frequency?',
    category: 'Onset & Duration'
  },
  {
    id: 'severity',
    text: 'What is the severity of symptoms and their impact on functioning?',
    category: 'Severity'
  },
  {
    id: 'history',
    text: 'What is the relevant mental health, medical, and treatment history?',
    category: 'History'
  },
  {
    id: 'risk_factors',
    text: 'Are there any current risk factors or safety concerns?',
    category: 'Risk Assessment'
  },
  {
    id: 'support_system',
    text: 'What support systems and coping resources are available?',
    category: 'Support Systems'
  },
  {
    id: 'mental_status',
    text: 'What are the relevant mental status observations?',
    category: 'Mental Status'
  },
  {
    id: 'diagnostic_impressions',
    text: 'What are the initial diagnostic impressions/observations?',
    category: 'Diagnostic Impressions'
  },
  {
    id: 'additional_info',
    text: 'Is there any additional information you would like to include in the assessment?',
    category: 'Additional Information'
  }
];