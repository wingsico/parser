const { translator, Grammer, utils }  = require('ll1-js');
const tokenizer = require('la-js');
const analyzer = require('./lib/analyzer');
const { resolve } = require('path');
const fs = require('fs');

const gPath = resolve(__dirname, './g.txt'); // 文法路径
const fPath = resolve(__dirname, './test.txt'); // 待识别式子路径

(function () {
  const translateRes = translator({
    inputPath: gPath,
    startSymbol: 'E',
    displayProcess: false,
    outputPath: false,
  });

  const formulasStr = fs.readFileSync(fPath, 'utf-8');

  const formulas = formulasStr.split(';').map(f => f.trim()).filter(f => f);
  formulas.forEach(formula => {
    const tokens = tokenizer(formula).map(({ value, type }) => {
      if (type === 'number' || type == 'name') {
        return 'i';
      }

      return value;
    });
    const pass = analyzer(tokens, translateRes);
    console.log(`${formula} -> ${pass}`)
  })

})()
