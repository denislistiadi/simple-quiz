interface data {
  name: string;
  point: number;
}

interface dataProps {
  data: data[];
}

const Ranking = (props: dataProps) => {
  return (
    <div className="p-7">
      <h2 className="text-xl tracking-widest text-center font-bold">
        LEADERBOARD
      </h2>
      <div className="pt-10 font-medium flex flex-col gap-2 justify-center">
        {props.data.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 items-center border p-2 rounded-md"
          >
            <p className="text-base">{index + 1}</p>
            <div className="flex flex-row justify-between w-full">
              <p>{item.name}</p>
              <p className="font-bold text-violet-800">{item.point}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
