import { db } from "./db.server";

async function createLesson(courseTitle, categoryName, lessonData) {
  let category = await db.category.findFirst({
    where: {
      name: categoryName,
    },
  });

  if (!category) {
    // Create the category if it doesn't exist
    category = await db.category.create({
      data: {
        name: categoryName,
      },
    });
  }

  let course = await db.course.findFirst({
    where: {
      title: courseTitle,
    },
  });

  if (!course) {
    // Create the course if it doesn't exist
    course = await db.course.create({
      data: {
        title: courseTitle,
        category: {
          connect: {
            name: categoryName,
          },
        },
      },
    });
  }

  // Create the lesson associated with the course
  const lesson = await db.lesson.create({
    data: {
      title: lessonData.title,
      content: lessonData.content,
      course: {
        connect: {
          id: course.id,
        },
      },
    },
  });

  return lesson;
}

async function getCourses(searchTerm) {
  try {
    const courses = await db.category.findMany({
      include: {
        courses: {
          include: {
            lessons: true,
          },
          where: searchTerm
            ? {
                title: {
                  contains: searchTerm,
                },
              }
            : {},
        },
      },
    });

    return courses;
  } catch (error) {
    console.error("Error fetching courses by categories:", error);
    throw error;
  }
}

export { createLesson, getCourses };
