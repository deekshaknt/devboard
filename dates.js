// Dates are stored as 'YYYY-MM-DD' strings. Adding T00:00:00 keeps them in local time.
function parseDate(iso) {
  return new Date(`${iso}T00:00:00`);
}

export function formatLongDate(iso) {
  return parseDate(iso).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getDateParts(iso) {
  const date = parseDate(iso);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString('en-IN', { month: 'short' }),
  };
}
