import React from 'react';
import { FileText, AlertCircle, MessageSquarePlus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Note } from '../types';
import { cn } from '../utils/cn';
import { useEffect, useRef } from 'react';

interface ProcessedNoteProps {
  note: Note;
  onReprocess?: (instructions: string) => void;
}

export function ProcessedNote({ note, onReprocess }: ProcessedNoteProps) {
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [instructions, setInstructions] = React.useState('');
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noteRef.current && !note.isProcessing) {
      noteRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [note.isProcessing]);
  
  if (note.error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Error Processing Note</span>
        </div>
        <p className="text-red-600">{note.error}</p>
      </div>
    );
  }

  const handleReprocess = (e: React.FormEvent) => {
    e.preventDefault();
    if (instructions.trim() && onReprocess) {
      onReprocess(instructions.trim());
      setShowInstructions(false);
      setInstructions('');
    }
  };

  return (
    <div ref={noteRef} className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <FileText className="w-6 h-6" />
        <h2>Processed Output</h2>
      </div>
      
      <div className={cn(
        "p-6 bg-white border rounded-lg shadow-sm",
        note.isProcessing && "animate-pulse"
      )}>
        {note.isProcessing ? (
          <div className="h-24 flex items-center justify-center">
            <p className="text-gray-500">Processing your note...</p>
          </div>
        ) : (
          <ReactMarkdown className="prose max-w-none">
            {note.processedContent || ''}
          </ReactMarkdown>
        )}
      </div>
      
      {note.processedContent && !note.isProcessing && (
        <div className="border-t pt-4 mt-6">
          {!showInstructions ? (
            <button
              type="button"
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Refine Output
            </button>
          ) : (
            <form onSubmit={handleReprocess} className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                  Additional Instructions
                </label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full h-24 p-4 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter instructions for refining the output..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={!instructions.trim()}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                >
                  Reprocess with Instructions
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowInstructions(false);
                    setInstructions('');
                  }}
                  className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}