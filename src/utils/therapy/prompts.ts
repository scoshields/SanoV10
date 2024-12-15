// This file contains the internal prompts used for each therapy type
// These prompts are not shown to users but guide the AI's documentation

export const THERAPY_PROMPTS: Record<string, string> = {
  // Trauma-Focused
  'emdr': 'Document target memory selection, SUDs and VOC scales, bilateral stimulation type, processing observations, installation and closure',
  'se': 'Document nervous system activation, tracking of bodily sensations, pendulation, titration, and resource development',
  'art': 'Document eye movement sets, scene changes, memory reconsolidation, and metaphor transformations',
  'sensorimotor': 'Document physical sensations, movement patterns, somatic interventions, and body-based processing',
  'tf_cbt': 'Document trauma narrative development, cognitive processing, relaxation skills, exposure progress',
  'cpm': 'Document trauma processing, bilateral stimulation, cognitive shifts, and emotional regulation',

  // Cognitive
  'cbt': 'Document cognitive distortions, thought records, behavioral experiments, and homework assignments',
  'dbt': 'Document skills modules, diary cards, chain analysis, mindfulness exercises',
  'act': 'Document values work, acceptance strategies, defusion techniques, and committed actions',
  'mbct': 'Document mindfulness practices, cognitive awareness exercises, and relapse prevention strategies',
  'rebt': 'Document irrational beliefs, disputation methods, and rational alternatives',

  // Psychodynamic
  'psychoanalytic': 'Document free associations, transference/countertransference, defense mechanisms, and interpretations',
  'attachment': 'Document attachment patterns, relationship dynamics, and corrective emotional experiences',
  'depth': 'Document symbolic material, archetypal themes, and unconscious processes',
  'ifs': 'Document parts work, unburdening processes, and internal system changes',

  // Humanistic
  'person_centered': 'Document client experiences, therapeutic presence, empathic understanding, and unconditional positive regard',
  'existential': 'Document meaning-making, authenticity exploration, and existential concerns',
  'gestalt': 'Document present-moment awareness, empty chair work, and experiential exercises',
  'emotion_focused': 'Document emotion schemes, attachment needs, and emotional transformation',

  // Behavioral
  'exposure': 'Document hierarchy development, exposure exercises, SUDs ratings, and habituation',
  'behavioral_activation': 'Document activity scheduling, monitoring, and reinforcement patterns',
  'habit_reversal': 'Document competing response training, awareness training, and social support',

  // Systemic
  'structural': 'Document family structure, boundaries, subsystems, and interventions',
  'strategic': 'Document problem patterns, strategic interventions, and homework tasks',
  'narrative': 'Document problem externalization, unique outcomes, and alternative story development',
  'bowen': 'Document differentiation of self, triangles, and multigenerational patterns',

  // Child & Creative Arts
  'play': 'Document play themes, symbolic expressions, therapeutic play interventions, and behavioral observations during play',
  'sand_tray': 'Document tray scene creation, symbolic elements chosen, arrangement patterns, and therapeutic processing',
  'art_therapy': 'Document art materials used, creative process observations, symbolic content, and therapeutic discussion of artwork',
  'music': 'Document musical interventions, client\'s response to rhythm/melody, emotional expression through music, and therapeutic interactions'
};