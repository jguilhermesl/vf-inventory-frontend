export function convertRealToNumber(valor) {
  const valueClean = valor.replace(/\s+|R\$/g, "");
  const value = valueClean.replace(",", ".");
  return parseFloat(value);
}
