const Nama = (props: any) => {
  return (
    <form onSubmit={props.start} className="flex flex-col gap-2 p-5">
      <label className="text-lg font-semibold text-gray-600" htmlFor="name">
        Nama
      </label>
      <input
        className="border rounded-lg py-2 px-1 outline-none"
        type="text"
        placeholder="Input Your Name"
        onChange={props.changeName}
        value={props.name}
      />
      <label className="text-lg font-semibold text-gray-600" htmlFor="category">
        Category
      </label>
      <select
        onChange={props.cangeCategory}
        defaultValue={props.category}
        className="py-2 w-full capitalize outline-none cursor-pointer text-left border rounded-lg block text-gray-400"
      >
        {Object.keys(props.categories).map((index, value) => (
          <option
            key={index}
            className="text-base pl-1 capitalize text-gray-600"
            value={props.categories[value]}
          >
            {props.categories[value]}
          </option>
        ))}
      </select>
      <label className="text-lg font-semibold text-gray-600" htmlFor="category">
        Difficulty
      </label>
      <select
        onChange={props.cangeDifficulty}
        defaultValue={props.difficulty}
        className="py-2 w-full capitalize outline-none cursor-pointer border rounded-lg block text-gray-400"
      >
        <option className="text-base pl-1 capitalize text-gray-600" value="easy">
          easy
        </option>
        <option className="text-base pl-1 capitalize text-gray-600" value="medium">
          medium
        </option>
        <option className="text-base pl-1 capitalize text-gray-600" value="hard">
          hard
        </option>
      </select>
      <button
        type="submit"
        className="px-5 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold text-white"
      >
        Mulai Quiz
      </button>
    </form>
  );
};

export default Nama;
