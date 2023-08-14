import { db } from "~/utils/db.server";

async function seed() {
  await Promise.all(
    getCourses().map((joke) => {
      return db.course.create({ data: joke });
    })
  );
}

seed();

function getCourses() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      title: "Road worker",
      slug: "road-worker",
      category: "data structures",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      title: "Trees",
      slug: "trees",
      category: "algorithms",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
  ];
}
