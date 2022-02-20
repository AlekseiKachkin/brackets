module.exports = function check(str, bracketsConfig) {
  const OPEN_BRACKETS = []
  const BRACKETS_PAIR = {}

  bracketsConfig.forEach( (element) => {
    OPEN_BRACKETS.push(element[0])
    BRACKETS_PAIR[element[1]] = element[0]
  });
  
  let stack = [];
  for ( let i = 0; i < str.length; ++i) {
    
    let currentSymbol = str[i];
    
    if ( OPEN_BRACKETS.includes(currentSymbol)) {
      if (BRACKETS_PAIR[currentSymbol] === currentSymbol && currentSymbol === stack[stack.length -1] && stack.length >= 1){
        stack.pop()
      } else {stack.push(currentSymbol);}
    } else {
      if (stack.length === 0) {
        return false
      }

      let topElement = stack[stack.length - 1];         
      if (BRACKETS_PAIR[currentSymbol] === topElement) {       
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}
// js
// check('()', [['(', ')']]) // -> true
// check('((()))()', [['(', ')']]) // -> true
// check('())(', [['(', ')']]) // -> false
// check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]) // -> true
// check('[(])', [['(', ')'], ['[', ']']]) // -> false
// check('[]()', [['(', ')'], ['[', ']']]) // -> true
// check('[]()(', [['(', ')'], ['[', ']']]) // -> false

// special case: opening and closing bracket can be the same :)

// check('||', [['|', '|']]) // -> true
// check('|()|', [['(', ')'], ['|', '|']]) // -> true
// check('|(|)', [['(', ')'], ['|', '|']]) // -> false
// check('|()|(||)||', [['(', ')'], ['|', '|']]) // -> true