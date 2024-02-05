export const convertRealToQuantity = (value) => {
  if (!value) {
    return "";
  }
  const numericValue = value.replace(/\D/g, "");
  const floatValue = parseFloat(numericValue) / 100;
  if (isNaN(floatValue)) {
    return "";
  }
  const formattedValue = floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formattedValue;
};
