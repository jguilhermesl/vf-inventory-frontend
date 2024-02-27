export function getDifferenceDays(orinalValidity) {
  const newDate = new Date();
  const validityDate = new Date(orinalValidity);
  const timeDifference = validityDate.getTime() - newDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
