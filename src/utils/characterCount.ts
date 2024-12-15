const MAX_CHARS = 4000;
const WARNING_THRESHOLD = 0.8; // Show warning at 80% of max

export function getCharacterCountInfo(text: string) {
  const count = text.length;
  const remaining = MAX_CHARS - count;
  const isOverLimit = count > MAX_CHARS;
  const isNearLimit = count > MAX_CHARS * WARNING_THRESHOLD && !isOverLimit;

  return {
    count,
    remaining,
    isOverLimit,
    isNearLimit,
    maxChars: MAX_CHARS
  };
}