import React from 'react';
import { PROMPT_OPTIONS, FORMAT_LABELS, FORMAT_DESCRIPTIONS } from '../utils/prompts';
import type { PromptType } from '../utils/prompts';

interface FormatSelectorProps {
  value: PromptType;
  onChange: (value: PromptType) => void;
  disabled?: boolean;
}

export function FormatSelector({ value, onChange, disabled }: FormatSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="promptType" className="block text-sm font-medium text-gray-700">
        Documentation Format
      </label>
      <div className="space-y-3">
        {Object.entries(FORMAT_LABELS).map(([key, label]) => (
          <label
            key={key}
            className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
              value === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="promptType"
                value={key}
                checked={value === key}
                onChange={(e) => onChange(e.target.value as PromptType)}
                disabled={disabled}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">{label}</div>
                <div className="mt-1 text-sm text-gray-500">
                  {FORMAT_DESCRIPTIONS[key as PromptType]}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}