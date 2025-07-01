function processData(students) {
  const filtered = students.filter(student => 
    student.name.toLowerCase().includes("alice") && student.score >= 50
  );

  const sorted = filtered.sort((a, b) => b.score - a.score);

  const rankedStudents = sorted.map((student, index) => ({
    rank: index + 1,
    name: student.name.trim().toUpperCase(),
    score: student.score
  }));

  const totalPassed = rankedStudents.reduce(count => count + 1, 0);

  return {
    totalPassed,
    students: rankedStudents
  };
}

const students = [
  { name: " Alice Johnson ", score: 85 },
  { name: "Bob Alice", score: 45 },
  { name: "alice smith", score: 91 },
  { name: "  ALICE Brown", score: 78 },
  { name: "David", score: 67 },
  { name: "Emily", score: 88 },
  { name: "Alicia", score: 70 },
  { name: "alice   ", score: 49 }
];

const result = processData(students);
console.log(result);
