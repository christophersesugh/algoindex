import React from "react";
import { Link } from "@remix-run/react";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { LiaBookReaderSolid } from "react-icons/lia";
import { TbWorldBolt } from "react-icons/tb";

export default function About() {
  return (
    <section>
      <div className="bg-slate-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-blue-500 text-3xl text-center py-6">
            About AlgoIndex
          </h1>
          <p>
            Welcome to AlgoIndex, your go-to platform for mastering data
            structures and algorithms! Our mission is to empower individuals
            with the knowledge and skills needed to excel in problem-solving and
            algorithmic thinking. Whether you're a student preparing for
            technical interviews, a seasoned developer seeking to enhance your
            skills, or someone passionate about the world of algorithms,
            AlgoIndex is here to support you on your learning journey.
          </p>
        </div>
        <div className="max-w-2xl flex flex-col items-center justify-center mx-auto gap-6 px-2 py-6">
          <h2 className="text-blue-500 text-2xl text-center py-6">
            What Sets Us Apart
          </h2>
          <div className="flex flex-col gap-10">
            {items.map((item, index) => (
              <div
                key={`item-${index}`}
                className="drop-shadow-xl rounded-md bg-white px-4 py-6 text-center mx-auto"
              >
                <div>
                  <div className="text-blue-500 flex justify-center">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-black my-4">{item.title}</h2>
                </div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-blue-500 text-2xl text-center py-6">
            Our Commitment
          </h2>
          <p className="py-6">
            We're committed to your success. Our team of experienced educators
            and developers is dedicated to creating high-quality, up-to-date
            content that equips you with the skills demanded by the industry. We
            continuously strive to enhance your learning experience, introduce
            new challenges, and keep you informed about the latest trends in
            algorithms and data structures.
          </p>
          <p className="py-6">
            Join the AlgoIndex community today and embark on a journey of
            discovery, learning, and growth. Together, we'll unravel the
            fascinating world of algorithms and equip you with the tools to
            tackle any problem that comes your way. Let's build a future where
            algorithmic thinking is your superpower!
          </p>
          <div className="flex justify-center">
            <Link to="/dsa">
              <button
                className="bg-blue-400 drop-shadow-lg text-white rounded-md p-4 my-6 capitalize self-center"
                aria-label="learn more"
              >
                start learning DSA
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const items = [
  {
    icon: <LuBrainCircuit className="text-[4rem]" />,
    title: "Comprehensive Learning Resources",
    desc: "Our platform offers an extensive library of algorithms and data structures, curated to cover a wide range of topics. From fundamental concepts to advanced algorithms, we've got you covered. Our interactive tutorials and in-depth explanations make complex concepts accessible to learners of all levels.",
  },
  {
    icon: <LiaBookReaderSolid className="text-[4rem]" />,
    title: "Hands-on Practice",
    desc: "We believe in learning by doing. That's why we provide a plethora of coding challenges designed to test your understanding and application of algorithms. Our interactive coding environment allows you to solve problems, test your solutions, and see optimal approaches—all in one place.",
  },
  {
    icon: <FaPeopleGroup className="text-[4rem]" />,
    title: "Community and Collaboration",
    desc: "Learning is more enjoyable when you're part of a supportive community. Connect with fellow learners, participate in study groups, and engage in discussions on algorithmic problem-solving. Collaborate on challenges, share insights, and inspire each other to grow.",
  },
  {
    icon: <TbWorldBolt className="text-[4rem]" />,
    title: "Real-world Relevance",
    desc: "Algorithms are not just theoretical concepts; they power the technology shaping our world. We showcase the real-world applications of algorithms, from data analysis to artificial intelligence, to inspire you with the endless possibilities that come with mastering these skills.",
  },
];
