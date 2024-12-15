import { ProcessingOptions } from '../types';
import { processResponse } from '../utils/responseProcessor';
import { validateResponseFormat } from '../utils/responseProcessor/validators';

const API_URL = '/.netlify/functions/process-note';

export async function processNoteWithAPI({ content, prompt }: ProcessingOptions) {
  try {
    // Validate input before making the request
    if (!content?.trim() || !prompt?.trim()) {
      throw new Error('Note content and processing instructions are required');
    }

    const trimmedContent = content.trim();
    const trimmedPrompt = prompt.trim();

    if (trimmedContent.length === 0) {
      throw new Error('Note content cannot be empty');
    }

    if (trimmedPrompt.length === 0) {
      throw new Error('Processing instructions cannot be empty');
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content: trimmedContent,
        prompt: trimmedPrompt
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || 'An error occurred while processing your request';
      
      // Handle specific HTTP status codes
      switch (response.status) {
        case 400:
          throw new Error(errorMessage || 'Invalid request format');
        case 401:
          throw new Error('Authentication error');
        case 429:
          throw new Error('Too many requests. Please try again later');
        case 500:
          throw new Error('Server error. Please try again later');
        default:
          throw new Error(`${errorMessage} (Status: ${response.status})`);
      }
    }

    let data;
    try {
      data = await response.json();
      
      if (!data) {
        throw new Error('Invalid response from server');
      }

      if (typeof data.processedContent === 'string') {
        // Validate content length
        if (data.processedContent.length === 0) {
          throw new Error('Server returned empty content');
        }

        // Validate response format
        const formatValidation = validateResponseFormat(
          data.processedContent,
          prompt.includes('clinical assessment')
        );

        // Log validation issues but don't fail
        if (formatValidation.errors.length > 0) {
          console.warn('Response format validation warnings:', formatValidation.errors);
        }

        data.processedContent = processResponse(
          data.processedContent,
          prompt.includes('clinical assessment')
        );
      } else {
        throw new Error('Server returned invalid content format');
      }

    } catch (error) {
      console.error('JSON Parse Error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Unable to process server response. Please try again.'
      );
    }

    return data;
  } catch (error) {
    console.error('API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    });
    
    // Ensure we always throw an Error object with a user-friendly message
    throw new Error(
      error instanceof Error 
        ? error.message
        : 'An unexpected error occurred. Please try again later.'
    );
  }
}