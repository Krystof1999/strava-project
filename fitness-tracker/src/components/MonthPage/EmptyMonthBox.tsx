import { Activity } from "../../entities/Activity";

interface Props {
  week: {
    start: string;
    end: string;
    activities: Activity[];
    sport_type: string;
    sportTypeDistances: {
      sport_type: string;
      distance: number;
    }[];
  };
}

const EmptyMonthBox = ({ week }: Props) => {
  return (
    <div className="border border-1 border-gray-300 rounded-md p-2 activity-font h-[180px]">
      <h1 className="flex justify-center mb-4 activity-font">
        {week.start} - {week.end}
      </h1>
    </div>
  );
};

export default EmptyMonthBox;
