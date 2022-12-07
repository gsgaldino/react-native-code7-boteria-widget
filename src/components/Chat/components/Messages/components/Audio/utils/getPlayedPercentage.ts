interface IGetPlayedPercentageProps {
  duration: number;
  currentTime: number;
}

export const getPlayedPercentage = ({
  duration,
  currentTime,
}: IGetPlayedPercentageProps) => {
  return (currentTime / duration) * 1;
};
