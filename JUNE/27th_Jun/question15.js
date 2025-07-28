function getCharacterFrequency(str) {
  return str
    .trim()                      
    .toLowerCase()              
    .split('')                 
    .reduce((freq, char) => {
      if (char !== ' ') {      
        freq[char] = (freq[char] || 0) + 1;
      }
      return freq;
    }, {});                     
}

const input = "  Hello World  ";
const result = getCharacterFrequency(input);

console.log(result);
