const Score = (props: any) => {
  return (
    <div className="sm:py-16 pb-16 px-10 flex flex-col gap-5 items-center">
      <h2 className="text-base font-semibold">Score Kamu adalah</h2>
      <p className="text-center text-6xl">{props.score}</p>
      <p>Cek peringkat kamu di</p>
      <button
        onClick={props.click}
        className="p-4 border rounded-lg w-full font-bold text-white border-white bg-gradient-to-r from-violet-500 to-fuchsia-500"
      >
        Leaderboard
      </button>
    </div>
  );
};

export default Score;
