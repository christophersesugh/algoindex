import { Link } from "react-router-dom";
import { CoreFeatures } from "../components/core-features";

export const meta = () => {
  return [
    { title: "AlgoIndex" },
    { name: "description", content: "Learn data structures and algorithms" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="h-auto bg-[#394264] text-white px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 pt-12 pb-20">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-center md:text-left capitalize max-w-lg md:max-w-xs">
              master data structures and algorithms with{" "}
              <span className="text-pink-400">
                algo<span className="text-blue-400">Index</span>
              </span>
            </h1>
            <p className="max-w-lg md:max-w-3xl my-6 text-center md:text-left">
              Unlock the Power of Efficient Problem Solving and Data
              Manipulation Using AlgoIndex
            </p>
            <Link to="/dsa" className="self-center">
              <button className="bg-blue-400 rounded-md p-2 capitalize">
                start for free
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center relative  bg-green-300  rounded-[100%] w-[50%] md:w-[80%] mt-8 md:mt-0">
            <img src="/algo.png" alt="algo index" className="w-[90%]" />
          </div>
        </div>
        <CoreFeatures />
      </header>
    </>
  );
}
