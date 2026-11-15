// Creates one task object for a missing skill
export function makeTask(skill) {
  return {
    id: Date.now() + Math.random(),
    title: "Learn " + skill,
    skill: skill,
    completed: false,
    source: "job",
  };
}

// Builds new tasks from the missing skills of saved jobs.
// Skips duplicates and skills that already have a task.
export function buildTasksFromJobs(jobs, existingTasks) {
  // Step 1: collect every missing skill from every job
  const allSkills = [];
  jobs.forEach((job) => {
    (job.missingSkills || []).forEach((skill) => {
      allSkills.push(skill);
    });
  });

  // Step 2: remove duplicates (a Set keeps each value only once)
  const uniqueSkills = [...new Set(allSkills)];

  // Step 3: remove skills that already have a task
  const newSkills = uniqueSkills.filter((skill) => {
    return !existingTasks.some((task) => task.skill === skill);
  });

  // Step 4: turn each remaining skill into a task object
  return newSkills.map(makeTask);
}