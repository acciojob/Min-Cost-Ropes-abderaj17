function MinCost() {
    const input = document.getElementById('ropesInput').value;
    const output = document.getElementById('output');

    if (!input) {
        output.textContent = 'Please enter some rope lengths.';
        return;
    }

    // Parse the input into an array of integers
    const ropes = input.split(',').map(Number);

    if (ropes.some(isNaN)) {
        output.textContent = 'Please enter valid numbers separated by commas.';
        return;
    }

    // Min-Heap implementation using a priority queue
    const minHeap = new MinHeap();
    ropes.forEach(rope => minHeap.insert(rope));

    let totalCost = 0;

    // Combine ropes until only one remains
    while (minHeap.size() > 1) {
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();
        const cost = first + second;
        totalCost += cost;
        minHeap.insert(cost);
    }

    // Display the result
    output.textContent = `The minimum cost to connect the ropes is ${totalCost}`;
}

// Min-Heap class implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();

        return min;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const current = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];

            if (current >= parent) break;

            this.heap[index] = parent;
            index = parentIndex;
        }

        this.heap[index] = current;
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const current = this.heap[index];

        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallest = index;

            if (leftIndex < length && this.heap[leftIndex] < this.heap[smallest]) {
                smallest = leftIndex;
            }

            if (rightIndex < length && this.heap[rightIndex] < this.heap[smallest]) {
                smallest = rightIndex;
            }

            if (smallest === index) break;

            this.heap[index] = this.heap[smallest];
            index = smallest;
        }

        this.heap[index] = current;
    }

    size() {
        return this.heap.length;
    }
}
