import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key missing');
      throw new Error('OpenAI API key is not configured');
    }

    if (!event.body) {
      throw new Error('Request body is empty');
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      console.error('JSON Parse Error:', e);
      throw new Error('Invalid JSON in request body');
    }

    const { content, prompt } = body;

    if (!content || typeof content !== 'string') {
      throw new Error('Content is required and must be a string');
    }

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Prompt is required and must be a string');
    }

    const openai = new OpenAI({ apiKey });

    // Validate and sanitize the input content
    const sanitizedContent = content.trim();
    const sanitizedPrompt = prompt.trim();

    if (!sanitizedContent) {
      throw new Error('Note content cannot be empty');
    }

    if (!sanitizedPrompt) {
      throw new Error('Processing instructions cannot be empty');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: sanitizedPrompt
        },
        {
          role: "user",
          content: `Process the following clinical notes:\n\n${sanitizedContent}`
        },
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const processedContent = completion.choices[0]?.message?.content;
    
    if (!processedContent) {
      throw new Error('The AI service did not generate a valid response');
    }

    const response = {
      processedContent: processedContent.trim()
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error in process-note function:', error);
    
    let statusCode = 500;
    let errorMessage = 'An unexpected error occurred while processing your note';
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        statusCode = 500;
        errorMessage = 'Server configuration error. Please contact support.';
      } else if (error.message.includes('The AI service')) {
        statusCode = 502;
        errorMessage = 'The AI service is currently unavailable. Please try again later.';
      } else if (error.message.includes('JSON')) {
        statusCode = 400;
        errorMessage = 'Invalid request format. Please try again.';
      } else if (error.message.includes('Content is required') || 
                 error.message.includes('Processing instructions')) {
        statusCode = 400;
        errorMessage = error.message;
      } else if (error.message.includes('insufficient_quota')) {
        statusCode = 429;
        errorMessage = 'Service quota exceeded. Please try again later.';
      } else if (error.message.includes('rate_limit_exceeded')) {
        statusCode = 429;
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else {
        statusCode = 500;
        errorMessage = error.message;
      }
    }
    
    // Ensure the error response is always properly formatted
    return {
      statusCode,
      headers: corsHeaders,
      body: JSON.stringify({ error: errorMessage })
    };
  }
};