interface IGetPlayerPositionProps {
  playedPercentage: number;
  duration: number;
}

export const getPlayedPosition = ({
  duration,
  playedPercentage,
}: IGetPlayerPositionProps) => {
  return duration * playedPercentage;
};
