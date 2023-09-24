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
      {activityProperties.map((a) => (
        <div className="mb-2" key={a.activityPropertyName}>
          <p className="text-xs text-gray-500">{a.activityPropertyName}</p>
          <p>
            {a.activityProperty}
            <span className="text-sm"> {a.activityUnit}</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default DayActivityProperty;
{
  /* <div className="mb-2">
<p className="text-xs text-gray-500">Celkem:</p>
<p>
  {(activity.distance / 1000).toFixed(2)}
  <span className="text-sm">km</span>
</p>
</div>
<div className="mb-2">
<p className="text-xs text-gray-500">Čas:</p>
<p>12h 23min</p>
</div>
<div className="mb-2">
<p className="text-xs text-gray-500">Výškové metry"</p>
<p>654m</p>
</div>
<div className="mb-2">
<p className="text-xs text-gray-500">Průměrná rychlost:</p>
<p>14 km/h</p>
</div>
<div className="mb-2">
<p className="text-xs text-gray-500">Maximální rychlost:</p>
<p>38 km/h</p>
</div>
<div>Mapa</div> */
}
