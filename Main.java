public class Main {

    // Method to merge two sorted halves of the array
    public static void conquer(int A[], int si, int mid, int ei) {
        int merge[] = new int[ei - si + 1]; // Temporary array for merged result
        
        int indx1 = si; // Starting index for the left half
        int indx2 = mid + 1; // Starting index for the right half
        int x = 0; // Index for the merge array

        // Merge elements from both halves into the merge array
        while (indx1 <= mid && indx2 <= ei) {
            if (A[indx1] < A[indx2]) {
                merge[x++] = A[indx1++];
            } else {
                merge[x++] = A[indx2++];
            }
        }

        // Copy remaining elements from the left half, if any
        while (indx1 <= mid) {
            merge[x++] = A[indx1++];
        }

        // Copy remaining elements from the right half, if any
        while (indx2 <= ei) {
            merge[x++] = A[indx2++];
        }

        // Copy the merged array back to the original array
        for (int i = 0, j = si; i < merge.length; i++, j++) {
            A[j] = merge[i];
        }
    }

    // Method to divide the array into halves recursively
    public static void divide(int A[], int si, int ei) {
        if (si >= ei) { // Base case: when the array cannot be divided further
            return;
        }

        int mid = si + (ei - si) / 2; // Find the middle index
        divide(A, si, mid); // Recursively divide the left half
        divide(A, mid + 1, ei); // Recursively divide the right half
        conquer(A, si, mid, ei); // Merge the two halves
    }

    public static void main(String[] args) {
        int A[] = {45, 20, 58, 1, 4}; // Array to be sorted
        int n = A.length; // Length of the array

        divide(A, 0, n - 1); // Start the divide and conquer process

        // Print the sorted array
        for (int i = 0; i < n; i++) {
            System.out.print(A[i] + " ");
        }
        System.out.println(); // Print a newline
    }
}
