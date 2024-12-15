import React, { useState } from 'react';
import { ScrollText, RefreshCw, AlertTriangle, ListChecks } from 'lucide-react';
import { THERAPY_CATEGORIES } from '../utils/therapy/categories';
import { getCharacterCountInfo } from '../utils/characterCount';
import { GUIDED_QUESTIONS } from '../utils/guidedQuestions';
import { ASSESSMENT_QUESTIONS } from '../utils/assessmentQuestions';
import { GuidedQuestions } from './GuidedQuestions';
import { TherapyTypeSelector } from './TherapyTypeSelector';
import type { NoteFormData } from '../types';
import type { PromptType } from '../utils/prompts';

type NoteType = 'session' | 'assessment';

interface NoteInputProps {
  onSubmit: (data: NoteFormData) => void;
  onClear: () => void;
  isProcessing: boolean;
}

export function NoteInput({ onSubmit, onClear, isProcessing }: NoteInputProps) {
  const [content, setContent] = useState('');
  const [selectedTherapies, setSelectedTherapies] = useState<string[]>([]);
  const [noteType, setNoteType] = useState<NoteType>('session');
  const [isGuided, setIsGuided] = useState<boolean>(false);
  const [guidedResponses, setGuidedResponses] = useState<Record<string, string>>({});
  const [customInstructions, setCustomInstructions] = useState('');

  const charInfo = getCharacterCountInfo(content);

  // Automatically enable guided mode for assessment notes
  React.useEffect(() => {
    if (noteType === 'assessment') {
      setIsGuided(true);
    }
  }, [noteType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasValidGuidedResponses = isGuided && Object.values(guidedResponses).some(response => response.trim());
    const hasValidContent = !isGuided && content.trim() && !charInfo.isOverLimit;
    
    if (hasValidGuidedResponses || hasValidContent) {
      onSubmit({ 
        content, 
        selectedTherapies,
        noteType,
        isGuided,
        guidedResponses: isGuided ? guidedResponses : undefined,
        customInstructions: customInstructions.trim() || undefined 
      });
    }
  };

  const handleClear = () => {
    setContent('');
    setSelectedTherapies([]);
    setIsGuided(false);
    setNoteType('session');
    setGuidedResponses({});
    setCustomInstructions('');
    onClear();
  };

  const handleNoteTypeChange = (type: NoteType) => {
    setNoteType(type);
    setContent('');
    setGuidedResponses({});
    setCustomInstructions('');
    onClear();
  };

  const handleGuidedResponseChange = (id: string, value: string) => {
    setGuidedResponses(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const activeQuestions = noteType === 'assessment' ? ASSESSMENT_QUESTIONS : GUIDED_QUESTIONS;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <ScrollText className="w-6 h-6" />
          <h2 className="text-base sm:text-lg">{noteType === 'assessment' ? 'Clinical Assessment' : 'Clinical Notes'}</h2>
        </div>
        <button
          type="button"
          onClick={handleClear}
          disabled={isProcessing || !content.trim()}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Clear Notes
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => handleNoteTypeChange('session')}
          className={`flex-1 px-4 py-2 text-sm border rounded-lg transition-colors ${
            noteType === 'session'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
          disabled={isProcessing}
        >
          Session Notes
        </button>
        <button
          type="button"
          onClick={() => handleNoteTypeChange('assessment')}
          className={`flex-1 px-4 py-2 text-sm border rounded-lg transition-colors ${
            noteType === 'assessment'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
          disabled={isProcessing}
        >
          Assessment Notes
        </button>
      </div>
      
      {noteType === 'session' && (
        <TherapyTypeSelector
          selectedTherapies={selectedTherapies}
          onAdd={(typeId) => setSelectedTherapies(prev => [...prev, typeId])}
          onRemove={(typeId) => setSelectedTherapies(prev => prev.filter(id => id !== typeId))}
          disabled={isProcessing}
        />
      )}

      {noteType !== 'assessment' && <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsGuided(!isGuided)}
          className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${
            isGuided 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
          disabled={isProcessing}
        >
          <ListChecks className="w-4 h-4" />
          Guided Mode {isGuided ? 'On' : 'Off'}
        </button>
      </div>}

      {noteType === 'assessment' && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <ListChecks className="w-5 h-5 text-blue-600" />
            <p className="font-medium text-blue-700">Assessment Mode Active</p>
          </div>
          <p className="text-sm text-blue-600">
            Complete the assessment questions below to generate a comprehensive clinical assessment. Each section helps create a thorough evaluation of the client's presentation and needs.
          </p>
        </div>
      )}

      {isGuided && (
        <div className="space-y-4">
          {noteType !== 'assessment' && <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-4">
            <p className="text-sm text-blue-700">
              Answer any of the questions below to generate your clinical notes. Each answer will be incorporated into the final documentation. The more detail you include, the more accurate and effective the documentation will be.
            </p>
          </div>}
          <GuidedQuestions
            responses={guidedResponses}
            questions={activeQuestions}
            onChange={handleGuidedResponseChange}
            disabled={isProcessing}
          />
        </div>
      )}

      {!isGuided && <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Session Notes
          <span className={`ml-2 text-sm ${
            charInfo.isOverLimit ? 'text-red-600' :
            charInfo.isNearLimit ? 'text-amber-600' :
            'text-gray-500'
          }`}>
            ({charInfo.count}/{charInfo.maxChars} characters)
          </span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-48 p-4 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono ${
            charInfo.isOverLimit ? 'border-red-500' :
            charInfo.isNearLimit ? 'border-amber-500' : ''
          }`}
          placeholder="Enter your session notes here..."
          disabled={isProcessing}
        />
        {(charInfo.isNearLimit || charInfo.isOverLimit) && (
          <div className={`flex items-center gap-2 text-sm ${
            charInfo.isOverLimit ? 'text-red-600' : 'text-amber-600'
          }`}>
            <AlertTriangle className="w-4 h-4" />
            <span>
              {charInfo.isOverLimit
                ? `Character limit exceeded by ${Math.abs(charInfo.remaining)} characters. Please reduce the content.`
                : `Approaching character limit. ${charInfo.remaining} characters remaining.`}
            </span>
          </div>
        )}
      </div>}

      <button
        type="submit"
        disabled={isProcessing || (isGuided ? !Object.values(guidedResponses).some(r => r.trim()) : !content.trim() || charInfo.isOverLimit)}
        className="w-full px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing...' : `Process ${noteType === 'assessment' ? 'Clinical Assessment' : 'Clinical Notes'}`}
      </button>
    </form>
  );
}