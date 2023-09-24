import { LuBike } from "react-icons/lu";
import { BsQuestion } from "react-icons/bs";
import { FaWalking, FaRunning, FaSkiingNordic, FaSkiing } from "react-icons/fa";
import { BiSwim } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Activity } from "../entities/Activity";

interface Props {
  activity: Activity;
}

type SportType =
  | "MountainBikeRide"
  | "Ride"
  | "Walk"
  | "Run"
  | "Swim"
  | "NordicSki"
  | "WeightTraining"
  | "AlpineSki";

const ActivityIcon = ({ activity }: Props) => {
  const iconsMap = {
    MountainBikeRide: <LuBike size={30} />,
    Ride: <LuBike size={30} />,
    Walk: <FaWalking size={30} />,
    Run: <FaRunning size={30} />,
    Swim: <BiSwim size={30} />,
    NordicSki: <FaSkiingNordic size={30} />,
    WeightTraining: <GiWeightLiftingUp size={30} />,
    AlpineSki: <FaSkiing size={30} />,
  };

  const sportType = activity?.sport_type as SportType;
  const icon = iconsMap[sportType] || <BsQuestion size={30} />;

  return (
    <div className="border border-1 border-[#F68C29] rounded-md p-1">
      {icon}
    </div>
  );
};

export default ActivityIcon;
