export const getHourAndMinutes = () => {
  const date = new Date();
  const minutesWithZero = `${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;

  return `${date.getHours()}:${minutesWithZero}`;
};
