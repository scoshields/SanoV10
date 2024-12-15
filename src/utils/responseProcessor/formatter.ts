import { SESSION_SECTIONS, ASSESSMENT_SECTIONS } from './constants';

function standardizeLineBreaks(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n');
}

function ensureSectionSpacing(content: string): string {
  const sections = content.split(/(?=^[A-Z][A-Z\s]+:)/m);
  return sections
    .map(section => section.trim())
    .join('\n\n');
}

function formatSection(section: string): string {
  return section
    .replace(/^\s+|\s+$/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\[\s*|\s*\]/g, '');
}

export function formatResponse(content: string, isAssessment: boolean): string {
  let formattedContent = standardizeLineBreaks(content);
  formattedContent = ensureSectionSpacing(formattedContent);

  const sections = isAssessment ? ASSESSMENT_SECTIONS : SESSION_SECTIONS;
  
  // Format each section individually
  sections.forEach(sectionHeader => {
    const sectionRegex = new RegExp(
      `(${sectionHeader}:)[^]*?(?=(?:${sections.join(':|')}:)|$)`,
      'g'
    );
    
    formattedContent = formattedContent.replace(sectionRegex, (match) => {
      const [header, content] = match.split(':');
      const formattedSectionContent = formatSection(content || '');
      return `${header}:\n${formattedSectionContent}`;
    });
  });

  return formattedContent;
}