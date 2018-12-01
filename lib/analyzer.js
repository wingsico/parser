const Stack = require('./class/Stack');

function analyzer(formula = [], translateRes = {}) {
  const { inputStopSymbol, startSymbol, terminator, nonTerminator, table, emptyChar } = translateRes;
  const stack = new Stack([inputStopSymbol, startSymbol]);
  const inputChars = [...formula, inputStopSymbol];
  // console.log(terminator)
  let current = 0; // 现在读入的字符的序号
  let currentChar = inputChars[current]; // 当前输入字符
  let stackTop = ""; // 栈顶符号
  while (true) {
    stackTop = stack.pop();
    // console.log(stackTop, inputStopSymbol, currentChar, current)
    if ([...terminator].includes(stackTop)) {
      if (stackTop === currentChar) {
        currentChar = inputChars[++current];
      } else {
        return false;
      }
    } else if (stackTop === inputStopSymbol) {
      if (stackTop === currentChar) {
        break;
      } else {
        return false;
      }
    } else if (includeProdutionLeftEqualChar(getProductionsFromTableByInputChar(table, currentChar), stackTop)) {
      const right = findRightByLeft(getProductionsFromTableByInputChar(table, currentChar), stackTop)[0];
      // console.log(right)
      right.split("").filter(c => c !== emptyChar).reverse().forEach(c => stack.push(c));
    } else {
      return false;
    }
  }
  return true;
}

function getProductionsFromTableByInputChar(table = {}, inputChar) {
  return Object.keys(table).reduce((acc, key) => {
    acc.push(table[key][inputChar]);
    return acc;
  }, [])
}

function includeProdutionLeftEqualChar(produtions = [], char = "") {
  // console.log(produtions)
  return produtions.map(([left, right]) => left).includes(char);
}

function findRightByLeft(produtions = [], left = "") {
  return produtions.filter(([a, b]) => left === a).map(([a, right]) => right);
}

module.exports = analyzer;
