import { Activity } from "../entities/Activity";

interface Props {
  activity: Activity;
}

const DayActivityProperty = ({ activity }: Props) => {
  const moving_time = activity.moving_time;
  const hours = Math.floor(moving_time / 3600);
  const minutes = Math.floor((moving_time % 3600) / 60);
  const seconds = moving_time % 60;
  let activityPropertyTime;

  if (hours < 1) {
    activityPropertyTime = `${minutes}m ${seconds}s`;
  } else {
    activityPropertyTime = `${hours}h ${minutes}m`;
  }

  const activityProperties = [
    {
      activityPropertyName: "Celkem",
      activityProperty: Number((activity.distance / 1000).toFixed(2)),
      activityUnit: "km",
    },
    {
      activityPropertyName: "Čas",
      activityProperty: activityPropertyTime,
      activityUnit: "",
    },
    {
      activityPropertyName: "Výškové metry",
      activityProperty: activity.total_elevation_gain,
      activityUnit: "m",
    },
    {
      activityPropertyName: "Maximální výška",
      activityProperty: activity.elev_high.toFixed(0),
      activityUnit: "m",
    },
    {
      activityPropertyName: "Průměrná rychlost",
      activityProperty: (activity.average_speed * 3.6).toFixed(1),
      activityUnit: "km/h",
    },
    {
      activityPropertyName: "Maximální rychlost",
      activityProperty: (activity.max_speed * 3.6).toFixed(1),
      activityUnit: "km/h",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2">
        {activityProperties.map((a) => (
          <div className="mb-2" key={a.activityPropertyName}>
            <p className="text-xs text-gray-500">{a.activityPropertyName}</p>
            <p>
              {a.activityProperty}
              <span className="text-sm"> {a.activityUnit}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DayActivityProperty;
