// script.js

// Helper function to create an array of random integers
function generateRandomArray(size, max) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * max) + 1
  );
}

// Helper function to display the array as bars
function displayArray(array) {
  const arrayContainer = document.getElementById("arrayContainer");
  arrayContainer.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    arrayContainer.appendChild(bar);
  });
}

// Bubble sort algorithm with visual update
async function bubbleSort(array) {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        // Highlight the bars being swapped
        bars[j].classList.add("glowing");
        bars[j + 1].classList.add("glowing");

        // Swap the elements in the array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Swap the bars' heights
        bars[j].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;

        // Add a delay for visual effect
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Remove the glowing class
        bars[j].classList.remove("glowing");
        bars[j + 1].classList.remove("glowing");
      }
    }
  }
  // Mark all bars as sorted
  for (let bar of bars) {
    bar.classList.add("sorted");
  }
}

// Event listeners for buttons
document.getElementById("generateArray").addEventListener("click", () => {
  const array = generateRandomArray(20, 100);
  displayArray(array);
});

document.getElementById("bubbleSort").addEventListener("click", () => {
  const array = Array.from(document.getElementsByClassName("bar")).map(
    (bar) => parseInt(bar.style.height) / 3
  );
  bubbleSort(array);
});

// Merge sort algorithm
// Helper function to create an array of random integers
function generateRandomArray(size, max) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * max) + 1
  );
}

// Helper function to display the array as bars
function displayArray(array) {
  const arrayContainer = document.getElementById("arrayContainer");
  arrayContainer.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    arrayContainer.appendChild(bar);
  });
}

// Function to merge two sorted halves of the array
async function conquer(arr, si, mid, ei) {
  let merge = new Array(ei - si + 1); // Temporary array for merged result

  let indx1 = si; // Starting index for the left half
  let indx2 = mid + 1; // Starting index for the right half
  let x = 0; // Index for the merge array

  // Merge elements from both halves into the merge array
  while (indx1 <= mid && indx2 <= ei) {
    if (arr[indx1] < arr[indx2]) {
      merge[x++] = arr[indx1++];
    } else {
      merge[x++] = arr[indx2++];
    }
  }

  // Copy remaining elements from the left half, if any
  while (indx1 <= mid) {
    merge[x++] = arr[indx1++];
  }

  // Copy remaining elements from the right half, if any
  while (indx2 <= ei) {
    merge[x++] = arr[indx2++];
  }

  // Copy the merged array back to the original array
  for (let i = 0, j = si; i < merge.length; i++, j++) {
    arr[j] = merge[i];

    // Update the bar heights for visual effect
    document.getElementsByClassName("bar")[j].style.height = `${arr[j] * 3}px`;
    document.getElementsByClassName("bar")[j].classList.add("glowing");
    await new Promise((resolve) => setTimeout(resolve, 50));
    document.getElementsByClassName("bar")[j].classList.remove("glowing");
  }
}

// Function to divide the array into halves recursively
async function divide(arr, si, ei) {
  if (si >= ei) {
    // Base case: when the array cannot be divided further
    return;
  }

  let mid = Math.floor(si + (ei - si) / 2); // Find the middle index
  await divide(arr, si, mid); // Recursively divide the left half
  await divide(arr, mid + 1, ei); // Recursively divide the right half
  await conquer(arr, si, mid, ei); // Merge the two halves
}

// Event listener for the "Generate New Array" button
document.getElementById("generateArray").addEventListener("click", function () {
  const array = generateRandomArray(20, 100);
  displayArray(array);
});

// Event listener for the "Merge Sort" button
document
  .getElementById("MergeSort")
  .addEventListener("click", async function () {
    let arr = Array.from(document.getElementsByClassName("bar")).map(
      (bar) => parseInt(bar.style.height) / 3
    );
    await divide(arr, 0, arr.length - 1); // Start the divide and conquer process

    // Change all bars to sorted color
    document
      .querySelectorAll(".bar")
      .forEach((bar) => bar.classList.add("sorted"));
  });
