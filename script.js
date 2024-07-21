function minCost(arr) {
    // Create a priority queue and add all the rope lengths
    let queue = new PriorityQueue();
    for (let i = 0; i < arr.length; i++) {
        queue.add(arr[i]);
    }

    // Initialize the total cost to 0
    let totalCost = 0;

    // While there's more than one rope left...
    while (queue.size() > 1) {
        // Take the two shortest ropes from the queue
        let cost = queue.poll() + queue.poll();

        // Add the cost to the total cost
        totalCost += cost;

        // Put the resulting rope back into the queue
        queue.add(cost);
    }

    // The total cost is now the minimum cost to connect all ropes
    return totalCost;
}