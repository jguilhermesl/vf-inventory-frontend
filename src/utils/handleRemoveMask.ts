export function handleRemoveMask(valor) {
  const number = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));

  return number;
}
