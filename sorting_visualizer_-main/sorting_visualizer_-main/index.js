import { SortingAlgorithms } from "./helpers/sortingAlgorithms.js";
import { sleep } from "./helpers/util.js";

let nBars = 10;

let numbersBars = document.getElementById('numbersBars');

const stage = document.getElementById('stage');
stage.style.width = `${nBars * 30}px`;

const selectAlgorithm = document.getElementById('selectAlgorithm');

const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');

let bars = [];
let barsDivs = [];

const sortingAlgorithms = new SortingAlgorithms({});

const start = () => {
  stage.innerHTML = '';

  bars = Array(nBars).fill(0).map(_ => {
    return {
      width: 20,
      height: Math.floor(Math.random() * 200) + 1
    };
  });

  barsDivs = [];

  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement('div');
    bar.style.width = `${bars[i].width}px`;
    bar.style.height = `${bars[i].height}px`;
    bar.style.left = `${5 + i * 30}px`;
    bars[i] = { ...bars[i], position: i };
    bar.classList.add('bar');
    barsDivs.push(bar);
    stage.appendChild(bar);
  }
};

start();

async function swapBars(barsDivs, i, j) {
  barsDivs[i].style.left = `${5 + j * 30}px`;
  barsDivs[i].classList.add('activate');
  barsDivs[j].style.left = `${5 + i * 30}px`;
  barsDivs[j].classList.add('activate');
  await sleep(300);
  barsDivs[i].classList.remove('activate');
  barsDivs[j].classList.remove('activate');
  let temp = barsDivs[i];
  barsDivs[i] = barsDivs[j];
  barsDivs[j] = temp;
}

// Merge Sort Helper function
async function mergeSortHelper(array, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSortHelper(array, left, mid);
  await mergeSortHelper(array, mid + 1, right);
  
  await merge(array, left, mid, right);
}

// Merge Helper function
async function merge(array, left, mid, right) {
  const leftArray = array.slice(left, mid + 1);
  const rightArray = array.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      barsDivs[k].style.height = `${leftArray[i]}px`;
      i++;
    } else {
      array[k] = rightArray[j];
      barsDivs[k].style.height = `${rightArray[j]}px`;
      j++;
    }
    barsDivs[k].classList.add('activate');
    await sleep(100);
    barsDivs[k].classList.remove('activate');
    k++;
  }

  while (i < leftArray.length) {
    array[k] = leftArray[i];
    barsDivs[k].style.height = `${leftArray[i]}px`;
    barsDivs[k].classList.add('activate');
    await sleep(100);
    barsDivs[k].classList.remove('activate');
    i++;
    k++;
  }

  while (j < rightArray.length) {
    array[k] = rightArray[j];
    barsDivs[k].style.height = `${rightArray[j]}px`;
    barsDivs[k].classList.add('activate');
    await sleep(100);
    barsDivs[k].classList.remove('activate');
    j++;
    k++;
  }
}

const algorithms = [
  sortingAlgorithms.bubbleSort,
  sortingAlgorithms.selectionSort,
  sortingAlgorithms.quickSort,
  sortingAlgorithms.insertionSort,
  sortingAlgorithms.mergeSort
];

const solve = async () => {
  const array = structuredClone(bars.map(el => el.height));

  // Run selected sorting algorithm
  if (selectAlgorithm.selectedIndex === 4) { // Merge Sort is at index 4
    await mergeSortHelper(array, 0, array.length - 1);
  } else {
    const swaps = algorithms[selectAlgorithm.selectedIndex](array);
    
    for (let i = 0; i < swaps.length; i++) {
      if (swaps[i].firstPostion !== swaps[i].lastPosition) {
        await swapBars(barsDivs, swaps[i].firstPostion, swaps[i].lastPosition);
      }
    }
  }
};

generateBtn.addEventListener('click', () => {
  nBars = parseInt(numbersBars.value, 10);
  stage.style.width = `${nBars * 30}px`;
  start();
});

solveBtn.addEventListener('click', () => {
  solve();
});
