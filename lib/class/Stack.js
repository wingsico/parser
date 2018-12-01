class Stack {
  constructor(initial = []) {
    this.stack = initial;
    this.size = this.stack.length;
  }

  getStackTop() {
    return this.stack[this.size - 1];
  }

  pop() {
    this.size -= 1;
    return this.stack.pop();
  }

  push(s) {
    this.size += 1;
    return this.stack.push(s);
  }

  getStack() {
    return this.stack;
  }

  getSize() {
    return this.size;
  }
}

module.exports = Stack;
