// Q4: Count the frequency of characters in a string

function countCharFrequency(str) {
  const charFreq = {};
  for (const char of str) {
    if (char !== ' ') {
      charFreq[char] = (charFreq[char] || 0) + 1;
    }
  }
  return charFreq;
}

// Example usage
console.log(countCharFrequency("hello world"));
