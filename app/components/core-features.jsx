import React from "react";
import { FaThinkPeaks } from "react-icons/fa";
import { BiBookContent } from "react-icons/bi";
import { MdQuiz } from "react-icons/md";
import { Link } from "react-router-dom";

export function CoreFeatures() {
  return (
    <section className="bg-white text-black py-12">
      <div className="flex flex-col items-center max-w-6xl mx-auto gap-8 px-4">
        <h1 className="text-3xl text-blue-500 font-bold mb-8">Core features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={`item-${index}`}
              className="drop-shadow-xl rounded-md bg-white p-4 text-center mx-auto"
            >
              <div className="items-center flex flex-col">
                <div className="text-blue-500 slef-center">{item.icon}</div>
                <h2 className="text-xl font-black my-4">{item.title}</h2>
              </div>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link to="/about">
          <button
            className="mt-8 border border-blue-500 text-blue-500 rounded-md p-2 capitalize"
            aria-label="learn more"
          >
            learn more...
          </button>
        </Link>
      </div>
    </section>
  );
}

const items = [
  {
    icon: <BiBookContent className="text-[3rem]" />,
    title: "Comprehensive Algorithm Library",
    desc: "AlgoIndex provides an extensive library of algorithms and data structures, organized in a user-friendly manner. Users can easily search for specific algorithms, explore in-depth explanations, and access code implementations in various programming languages. From fundamental sorting algorithms to advanced graph algorithms, AlgoIndex ensures a robust resource for anyone looking to learn, practice, or review algorithms.",
  },
  {
    icon: <MdQuiz className="text-[3rem]" />,
    title: "Collaborative Problem Solving",
    desc: "AlgoIndex encourages users to collaborate on algorithmic problem-solving. Users can form study groups, share coding challenges, and engage in discussions to collectively tackle complex problems. The platform fosters a supportive community where users learn from each other, exchange ideas, and enhance their problem-solving skills through group interactions.",
  },
  {
    icon: <FaThinkPeaks className="text-[3rem]" />,
    title: "Real-world Algorithm Applications",
    desc: "AlgoIndex emphasizes the practical application of algorithms in real-world scenarios. It provides case studies and showcases how popular algorithms are used in industries such as data analysis, machine learning, and software development. Users gain insights into the relevance of algorithms and how mastering them can open up opportunities in various fields, enhancing their motivation to learn and apply these concepts.",
  },
];
