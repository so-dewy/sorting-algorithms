export interface ISortingStrategy {
    sort(array: number[], compareFn?: (a: number, b: number) => number): void
}
