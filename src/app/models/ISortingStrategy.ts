export interface ISortingStrategy {
    delay: number;
    sort(array: any[], compareFn?: (a: any, b: any) => any): AsyncGenerator<any[], void, unknown>
}
