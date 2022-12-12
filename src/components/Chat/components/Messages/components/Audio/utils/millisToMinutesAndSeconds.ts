export const millisToMinutesAndSeconds = (millis: number): string => {
  if (isNaN(millis)) return `0:00`;
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(Number(seconds) < 10 ? '0' : '') + seconds}`;
};
