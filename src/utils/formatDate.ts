// Format a string to date, spanish
export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };
  return new Date(date).toLocaleDateString('es-ES', options);
}