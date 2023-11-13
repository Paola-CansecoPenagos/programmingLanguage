const parser = require('./gramatica.js');

const codigo = 'func main (var, var4 ,var2) { variable = 12 }';

try {
  const resultado = parser.parse(codigo);
  console.log('El código es correcto');
} catch (error) {
  console.error('Error de sintaxis:', error.message);
}
