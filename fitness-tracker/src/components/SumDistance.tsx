interface Props {
  sumsOfKm: string;
}

const SumDistance = ({ sumsOfKm }: Props) => {
  return (
    <h1 className="activity-font flex justify-center ">
      Celkem:<span className="text-[#F68C29] mx-1">{sumsOfKm}</span>km
    </h1>
  );
};

export default SumDistance;
