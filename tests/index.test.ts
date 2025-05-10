import { findCheapestPath } from '../index';

describe('findCheapestPath', () => {
    it('should find cheapest EUR path to DEUT', () => {
        const result = findCheapestPath("Client", "DEUT", "EUR");
        expect(result.path).toEqual(["Client", "ING", "KBC", "DEUT"]);
        expect(result.totalCost).toBe(26);
    });

    it('should find cheapest USD path to HSBC', () => {
        const result = findCheapestPath("Client", "HSBC", "USD");
        expect(result.path).toEqual(["Client", "BNP", "SMBC", "BOFA", "HSBC"]);
        expect(result.totalCost).toBe(34);
    });

    it('should return empty path for unknown bank', () => {
        const result = findCheapestPath("Client", "UNKNOWN", "EUR");
        expect(result.path).toEqual([]);
        expect(result.totalCost).toBe(Infinity);
    });
});
