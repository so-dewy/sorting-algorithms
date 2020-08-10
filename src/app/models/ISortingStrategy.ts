export interface ISortingStrategy {
    delay: number;
    displayName: string;
    sort(array: any[], compareFn?: (a: any, b: any) => any): AsyncGenerator<any[], void, unknown>
}
