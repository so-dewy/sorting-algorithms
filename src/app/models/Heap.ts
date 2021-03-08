export class Heap<T> {
  private heapBody: T[];

  constructor(items: T[]) {
    this.heapBody = [null];
    items.forEach(el => this.insert(el));
  }

  getParentIndex(index: number) {
    return index == 1 ? -1 : Math.floor(index / 2);
  }

  getChildIndex(index: number) {
    return index * 2;
  }

  extractMinimum(): T {
    if (!this.heapBody.length) {
      return null;
    } 
    
    const min = this.heapBody[1];
    this.heapBody[1] = this.heapBody.pop();
    this.bubbleDown(1);
    return min;
  }

  insert(item: T) {
    this.heapBody.push(item);
    this.bubbleUp(this.heapBody.length - 1);
  }

  private bubbleUp(index: number) {
    const parentIndex = this.getParentIndex(index);
    if (parentIndex == -1) {
      return;
    }

    if (this.heapBody[parentIndex] > this.heapBody[index]) {
      const buff = this.heapBody[parentIndex];
      this.heapBody[parentIndex] = this.heapBody[index];
      this.heapBody[index] = buff;

      this.bubbleUp(parentIndex);
    }
  }

  private bubbleDown(index: number) {
    const childIndex = this.getChildIndex(index);
    let minIndex = index;
    for (let i = 0; i <= 1; i++) {
      if (childIndex + i <= this.heapBody.length && 
        this.heapBody[minIndex] > this.heapBody[childIndex + i]) {
          minIndex = childIndex + i;
      }
    }

    if (minIndex != index) {
      const buff = this.heapBody[minIndex];
      this.heapBody[minIndex] = this.heapBody[index];
      this.heapBody[index] = buff;

      this.bubbleDown(minIndex);
    }
  }

}
