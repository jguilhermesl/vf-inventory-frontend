export function formatCurrencyToFloat(value) {
  const cleanedString = value.replace('R$', '').replace(/\./g, '').replace(',', '.');

  // Converte a string limpa para um número de ponto flutuante
  const floatValue = parseFloat(cleanedString);

  return floatValue;
}