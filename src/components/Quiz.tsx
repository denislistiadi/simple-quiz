const Quiz = (props: any) => {
  return (
    <div className="flex flex-col gap-4 p-4 pb-6">
      <h4 className="font-semibold text-xl">{props.question}</h4>
      {props.choices.map((choice: any, index: any) => (
        <button
          key={index}
          onClick={() => props.click(choice)}
          value={choice}
          className="border-2 border-violet-500 rounded-lg p-4 font-medium hover:text-white hover:border-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 "
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
