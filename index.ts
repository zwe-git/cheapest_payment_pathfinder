type Currency = "EUR" | "USD";
export function findCheapestPath(start: string, target: string, currency: Currency): { path: string[], totalCost: number } {
    const graph: { [key: string]: string[] } = {
        Client: ["BNP", "ING"],
        BNP: ["SMBC"],
        ING: ["KBC"],
        SMBC: ["BOFA", "Lloyds", "DEUT"],
        BOFA: ["HSBC", "SMBC", "CITI"],
        CITI: ["DEUT"],
        Lloyds: ["KBC"],
        KBC: ["DEUT"],
    };

    const fees: { [key: string]: { EUR: number; USD: number } } = {
        BNP: { EUR: 10, USD: 5 },
        ING: { EUR: 8, USD: 5 },
        Lloyds: { EUR: 12, USD: 4 },
        SMBC: { EUR: 6, USD: 22 },
        KBC: { EUR: 7, USD: 14 },
        DEUT: { EUR: 11, USD: 2 },
        CITI: { EUR: 5, USD: 6 },
        HSBC: { EUR: 9, USD: 4 },
        BOFA: { EUR: 9, USD: 3 },
    };

    const queue = [{ node: start, path: [start], cost: 0 }];
    const visited = new Set<string>();
    let minCost = Infinity;
    let bestPath: string[] = [];

    while (queue.length > 0) {
        const { node, path, cost } = queue.shift()!;
        if (node === target && cost < minCost) {
            minCost = cost;
            bestPath = path;
            continue;
        }
        if (visited.has(node)) continue;
        visited.add(node);

        for (const next of graph[node] || []) {
            const nextCost = cost + (fees[next]?.[currency] || 0);
            queue.push({ node: next, path: [...path, next], cost: nextCost });
        }
    }

    return { path: bestPath, totalCost: minCost };
}
