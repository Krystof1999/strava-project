import ActivityIcon from "../ActivityIcon";

interface Props {
  weekActivity: {
    sport_type: string;
    distance: number;
    gymTime: number;
  };
}

const WeekActivities = ({ weekActivity }: Props) => {
  const moving_time = weekActivity.gymTime;

  const hours = Math.floor(moving_time / 3600);
  const minutes = Math.floor((moving_time % 3600) / 60);
  let activityPropertyTime;

  if (hours < 1) {
    activityPropertyTime = `${minutes}m`;
  } else {
    activityPropertyTime = `${hours}h ${minutes}m`;
  }

  console.log(hours);
  console.log(minutes);
  return (
    <>
      <div className="flex items-center gap-3">
        <>
          <div className="border border-1 border-[#F68C29] rounded-md p-1">
            <ActivityIcon activityType={weekActivity.sport_type} />
          </div>
          <div>
            {weekActivity.sport_type === "WeightTraining" ? (
              <p>{activityPropertyTime}</p>
            ) : (
              <p>{`${(weekActivity.distance / 1000).toFixed(1)} km`}</p>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default WeekActivities;
