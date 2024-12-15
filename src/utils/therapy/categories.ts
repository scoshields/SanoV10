export interface TherapyType {
  id: string;
  name: string;
}

export interface TherapyCategory {
  id: string;
  name: string;
  types: TherapyType[];
}

export const THERAPY_CATEGORIES: TherapyCategory[] = [
  {
    id: 'trauma',
    name: 'Trauma-Focused',
    types: [
      { id: 'emdr', name: 'EMDR' },
      { id: 'se', name: 'Somatic Experiencing (SE)' },
      { id: 'art', name: 'Accelerated Resolution Therapy (ART)' },
      { id: 'sensorimotor', name: 'Sensorimotor' },
      { id: 'tf_cbt', name: 'Trauma-Focused CBT' },
      { id: 'cpm', name: 'Compassionate Processing Method' }
    ]
  },
  {
    id: 'cognitive',
    name: 'Cognitive',
    types: [
      { id: 'cbt', name: 'Cognitive Behavioral Therapy (CBT)' },
      { id: 'dbt', name: 'Dialectical Behavior Therapy (DBT)' },
      { id: 'act', name: 'Acceptance & Commitment Therapy (ACT)' },
      { id: 'mbct', name: 'Mindfulness-Based CBT' },
      { id: 'rebt', name: 'Rational Emotive Behavior Therapy' }
    ]
  },
  {
    id: 'psychodynamic',
    name: 'Psychodynamic',
    types: [
      { id: 'psychoanalytic', name: 'Psychoanalytic' },
      { id: 'attachment', name: 'Attachment-Based' },
      { id: 'depth', name: 'Depth Psychology' },
      { id: 'ifs', name: 'Internal Family Systems' }
    ]
  },
  {
    id: 'humanistic',
    name: 'Humanistic',
    types: [
      { id: 'person_centered', name: 'Person-Centered' },
      { id: 'existential', name: 'Existential' },
      { id: 'gestalt', name: 'Gestalt' },
      { id: 'emotion_focused', name: 'Emotion-Focused' }
    ]
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    types: [
      { id: 'exposure', name: 'Exposure Therapy' },
      { id: 'behavioral_activation', name: 'Behavioral Activation' },
      { id: 'habit_reversal', name: 'Habit Reversal' }
    ]
  },
  {
    id: 'systemic',
    name: 'Systemic',
    types: [
      { id: 'structural', name: 'Structural' },
      { id: 'strategic', name: 'Strategic' },
      { id: 'narrative', name: 'Narrative' },
      { id: 'bowen', name: 'Bowen Family Systems' }
    ]
  },
  {
    id: 'child',
    name: 'Child & Creative',
    types: [
      { id: 'play', name: 'Play Therapy' },
      { id: 'sand_tray', name: 'Sand Tray Therapy' },
      { id: 'art', name: 'Art Therapy' },
      { id: 'music', name: 'Music Therapy' }
    ]
  }
];