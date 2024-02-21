export function formatDDMMYYYYToDate(dateString) {
  if (!dateString) {
    return null;
  }

  const [day, month, year] = dateString.split('/');
  // Mês em JavaScript é base 0, então subtraímos 1 do mês
  return new Date(year, month - 1, day);
}
