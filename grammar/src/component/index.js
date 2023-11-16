import { peg$parse } from './gramatica';

export function evaluarCodigo (codigo) {
  try {
    const resultado = peg$parse(codigo);
    return { success: true, resultado };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
