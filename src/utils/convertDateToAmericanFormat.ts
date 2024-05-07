export function convertDateToAmericanFormat(brazilianDate) {
  const parts = brazilianDate.split('/');

  return parts[1] + '/' + parts[0] + '/' + parts[2];
}
