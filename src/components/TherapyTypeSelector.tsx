import React from 'react';
import { THERAPY_CATEGORIES } from '../utils/therapy/categories';
import { X } from 'lucide-react';
import type { TherapyType } from '../utils/therapy/categories';

interface TherapyTypeSelectorProps {
  selectedTherapies: string[];
  onAdd: (typeId: string) => void;
  onRemove: (typeId: string) => void;
  disabled?: boolean;
}

export function TherapyTypeSelector({ selectedTherapies, onAdd, onRemove, disabled }: TherapyTypeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    THERAPY_CATEGORIES[0].id
  );
  const [selectedType, setSelectedType] = React.useState<string>(
    THERAPY_CATEGORIES[0].types[0].id
  );

  const currentCategory = THERAPY_CATEGORIES.find(cat => cat.id === selectedCategory);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const category = THERAPY_CATEGORIES.find(cat => cat.id === newCategory);
    if (category && category.types.length > 0) {
      setSelectedType(category.types[0].id);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleAddTherapy = () => {
    if (!selectedTherapies.includes(selectedType)) {
      onAdd(selectedType);
    }
  };

  const getTherapyName = (typeId: string): string => {
    for (const category of THERAPY_CATEGORIES) {
      const type = category.types.find(t => t.id === typeId);
      if (type) return type.name;
    }
    return typeId;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="space-y-1">
            <h3 className="text-base font-medium text-gray-900">
              Therapy Approaches
            </h3>
            <p className="text-sm text-gray-500">
              Optional: Select one or more therapeutic approaches for this session. These will help the AI in generating more accurate and relevant notes.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Therapy Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={disabled}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            {THERAPY_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {currentCategory && (
          <div className="space-y-2">
            <label htmlFor="therapyType" className="block text-sm font-medium text-gray-700">
              Type of Therapy
            </label>
            <div className="flex gap-2">
              <select
                id="therapyType"
                value={selectedType}
                onChange={handleTypeChange}
                disabled={disabled}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                {currentCategory.types.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddTherapy}
                disabled={disabled || selectedTherapies.includes(selectedType)}
                className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {selectedTherapies.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700">
              Selected Approaches
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedTherapies.map(typeId => (
                <div
                  key={typeId}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                >
                  <span className="text-sm">{getTherapyName(typeId)}</span>
                  <button
                    onClick={() => onRemove(typeId)}
                    className="p-1 hover:text-blue-900 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}