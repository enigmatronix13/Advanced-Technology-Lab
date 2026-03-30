// Q2: Remove duplicate elements from an array

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Example usage
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5, 5, 5]));
