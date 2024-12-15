import React from 'react';
import type { GuidedQuestion } from '../types';

interface GuidedQuestionsProps {
  responses: Record<string, string>;
  questions: GuidedQuestion[];
  onChange: (id: string, value: string) => void;
  disabled?: boolean;
}

export function GuidedQuestions({ responses, questions, onChange, disabled }: GuidedQuestionsProps) {
  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <label 
            htmlFor={question.id}
            className="block text-sm font-medium text-gray-700"
          >
            {question.text}
          </label>
          <textarea
            id={question.id}
            value={responses[question.id] || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            disabled={disabled}
            className="w-full h-24 p-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
            placeholder={`Enter details about ${question.category.toLowerCase()}...`}
          />
        </div>
      ))}
    </div>
  );
}