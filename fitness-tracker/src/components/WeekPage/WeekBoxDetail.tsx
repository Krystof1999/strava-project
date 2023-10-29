interface Props {
  distanceByEachDay: {
    [date: string]: {
      distance: number;
      moving_time: number;
    };
  };
  day: {
    date: string;
    day: string;
  };
}

const WeekBoxDetail = ({ distanceByEachDay, day }: Props) => {
  const hours = Math.floor(distanceByEachDay[day.date].moving_time / 3600);
  const minutes = Math.floor(
    (distanceByEachDay[day.date].moving_time % 3600) / 60
  );
  let activityPropertyTime;

  if (hours < 1) {
    activityPropertyTime = (
      <>
        {minutes} <span className="text-black">m</span>
      </>
    );
  } else {
    activityPropertyTime = (
      <>
        {hours} <span className="text-black">h</span> {minutes}{" "}
        <span className="text-black">m</span>
      </>
    );
  }

  return (
    <>
      {distanceByEachDay[day.date]?.distance > 0 ? (
        <p className=" text-[#F68C29]">
          {distanceByEachDay[day.date]?.distance.toFixed(2)}
          <span className="text-black"> km</span>
        </p>
      ) : distanceByEachDay[day.date]?.moving_time > 0 ? (
        <p className=" text-[#F68C29]">{activityPropertyTime}</p>
      ) : (
        <p>
          0<span className="text-gray-200"> km</span>
        </p>
      )}
    </>
  );
};

export default WeekBoxDetail;
