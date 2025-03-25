const Compare = { 
  LESS_THAN: -1, 
  BIGGER_THAN: 1 
};

const defaultCompare = (a, b) => { 
  if (a === b) { 
    return 0; 
  } 
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN; 
};

let swaps = []; 

const partition = (array, left, right, compareFn) => { 
  const pivot = array[Math.floor((right + left) / 2)];
  
  let i = left; 
  let j = right;
  
  while (i <= j) { 
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) { 
      i++; 
    } 
    
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) { 
      j--; 
    } 
    
    if (i <= j) { 
      let temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
      swaps.push({ firstPostion: i, lastPosition: j }); 
      i++; 
      j--; 
    } 
  } 
  
  return i; 
};

const quick = (array, left, right, compareFn) => { 
  let index; 
  if (array.length > 1) { 
    index = partition(array, left, right, compareFn); 
    if (left < index - 1) { 
      quick(array, left, index - 1, compareFn); 
    } 
    if (index < right) { 
      quick(array, index, right, compareFn); 
    } 
  } 
  
  return array; 
};

class SortingAlgorithms { 
    
  bubbleSort(array) { 
    const swaps = []; 
    for (let i = 0; i < array.length; i++) { 
      // Last i elements are already in place 
      for (let j = 0; j < array.length - i - 1; j++) { 
        // Checking if the item at present iteration is greater than the next iteration 
        if (array[j] > array[j + 1]) { 
          // If the condition is true, swap them 
          let temp = array[j]; 
          array[j] = array[j + 1]; 
          array[j + 1] = temp; 
          swaps.push({ firstPostion: j, lastPosition: j + 1 }); 
        } 
      } 
    } 
    return swaps; 
  } 
    
  selectionSort(array) { 
    const swaps = []; 
    let min; 
    for (let i = 0; i < array.length - 1; i++) { 
      min = i; 
      for (let j = i + 1; j < array.length; j++) { 
        if (array[j] < array[min]) { 
          min = j; 
        } 
      } 
      let temp = array[min]; 
      array[min] = array[i]; 
      array[i] = temp; 
      swaps.push({ firstPostion: min, lastPosition: i }); 
    } 
    return swaps; 
  } 
    
  quickSort(array, compareFn = defaultCompare) { 
    swaps = []; 
    quick(array, 0, array.length - 1, compareFn); 
    return swaps; 
  }
  
  // Insertion Sort
  insertionSort(array) { 
    const swaps = [];
    for (let i = 1; i < array.length; i++) { 
      let currentValue = array[i]; 
      let j = i - 1;
      
      // Shift larger values to the right
      while (j >= 0 && array[j] > currentValue) { 
        array[j + 1] = array[j]; 
        j--; 
        swaps.push({ firstPostion: j + 1, lastPosition: j + 2 }); 
      } 
      
      // Place the current value at the correct position
      array[j + 1] = currentValue; 
    } 
    return swaps; 
  } 
  
  // Merge Sort
  mergeSort(array) { 
    const swaps = [];
    
    // Helper function to merge two halves
    const merge = (left, right) => {
      let result = [];
      let i = 0, j = 0;

      // Merge both halves in sorted order
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      // Concatenate remaining elements
      return result.concat(left.slice(i), right.slice(j));
    };
    
    // Helper function for recursive merge sort
    const sort = (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = sort(arr.slice(0, mid));
      const right = sort(arr.slice(mid));
      
      return merge(left, right);
    };
    
    array = sort(array); 
    return swaps; // Swaps would need to be captured during the merge process if you wish to track them
  } 
}

export { SortingAlgorithms };
