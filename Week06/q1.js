// Q1: Find the largest element in an array

function findLargest(arr) {
  if (arr.length === 0) return null;
  return Math.max(...arr);
}

// Example usage
console.log(findLargest([3, 7, 2, 9, 1, 14, 5]));
