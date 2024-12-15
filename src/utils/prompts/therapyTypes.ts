export interface TherapyType {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
}

export interface TherapyCategory {
  id: string;
  name: string;
  description: string;
  types: TherapyType[];
}

export const THERAPY_CATEGORIES: TherapyCategory[] = [
  {
    id: 'cognitive',
    name: 'Cognitive & Behavioral',
    description: 'Focuses on identifying and changing maladaptive thoughts and behaviors',
    types: [
      {
        id: 'cbt',
        name: 'Cognitive Behavioral Therapy (CBT)',
        description: 'Structured approach focusing on thoughts, feelings, and behaviors',
        promptTemplate: `
Document specific cognitive distortions identified
Track behavioral experiments and outcomes
Note homework assignments given/reviewed
Record thought record progress
Document skill acquisition and practice
Include rational responses developed`
      },
      {
        id: 'dbt',
        name: 'Dialectical Behavior Therapy (DBT)',
        description: 'Combines cognitive-behavioral techniques with mindfulness',
        promptTemplate: `
Document mindfulness practices used
Track skills training and implementation
Note diary card review
Record emotional regulation strategies
Document interpersonal effectiveness
Include distress tolerance techniques`
      }
    ]
  },
  {
    id: 'trauma',
    name: 'Trauma-Focused',
    description: 'Specialized approaches for processing traumatic experiences',
    types: [
      {
        id: 'emdr',
        name: 'Eye Movement Desensitization & Reprocessing',
        description: 'Structured approach using bilateral stimulation',
        promptTemplate: `
Document target memory selection
Record SUDs and VOC scales
Note bilateral stimulation type used
Track changes in cognitions
Document installation process
Include closure and stabilization`
      },
      {
        id: 'tf_cbt',
        name: 'Trauma-Focused CBT',
        description: 'Structured trauma-focused cognitive behavioral approach',
        promptTemplate: `
Document trauma narrative development
Track cognitive restructuring specific to trauma
Note relaxation/coping skills practiced
Record parent/caregiver involvement
Document gradual exposure progress
Include safety planning updates`
      }
    ]
  },
  {
    id: 'psychodynamic',
    name: 'Psychodynamic & Internal Systems',
    description: 'Explores internal dynamics and unconscious processes',
    types: [
      {
        id: 'ifs',
        name: 'Internal Family Systems',
        description: 'Works with different parts of the internal system',
        promptTemplate: `
Identify parts that emerged in session
Document unburdening processes
Note system interactions observed
Record protective responses
Track Self energy presence
Document internal system changes`
      },
      {
        id: 'psychodynamic',
        name: 'Psychodynamic Therapy',
        description: 'Explores unconscious patterns and past experiences',
        promptTemplate: `
Document transference/countertransference
Track patterns and interpretations
Note resistance and defenses
Record insight development
Document childhood connections
Include dream work if applicable`
      }
    ]
  }
];