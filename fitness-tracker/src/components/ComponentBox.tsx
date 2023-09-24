import { DisplayDate } from "../entities/DisplayDate";
import DayBox from "./DayBox";

interface Props {
  selectedTab: string;
  displayDate: DisplayDate;
}

const ComponentBox = ({ selectedTab, displayDate }: Props) => {
  return (
    <div>
      {selectedTab === "DEN" && <DayBox displayDate={displayDate} />}

      {/*Week Box */}
      {/*Month Box */}
      {/*Year Box */}
    </div>
  );
};

export default ComponentBox;
