// Função para formatar a data
export const convertFormatValidity = (value) => {
  if (!value) {
    return "";
  }
  const numericValue = value.replace(/\D/g, "");
  const limitedValue = numericValue.slice(0, 8);
  const formattedValue = limitedValue.replace(
    /(\d{2})(\d{2})(\d{4})/,
    "$1/$2/$3"
  );

  return formattedValue;
};
