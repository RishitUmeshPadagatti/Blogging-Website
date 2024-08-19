export const multipleWordsToATag = (input: string): string => {
    return input
        .split(/\s+/)
        .map(e => e.charAt(0).toUpperCase() + e.slice(1)) // Capitalize first letter, preserve rest
        .join('');
}
