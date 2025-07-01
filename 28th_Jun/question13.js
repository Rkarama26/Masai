function addStudent(students, name, position) {
    if (position < 0 || position > students.length) {
        console.warn(`Invalid position: ${position}. Student not added.`);
        return students;
    }
    students.splice(position, 0, name);
    return students;
}

function isStudentPresent(students, name) {
    return students.includes(name);
}

function joinStudents(students, separator = ",") {
    return students.join(separator);
}

function runTests() {
    let testPassed = 0;
    let totalTests = 0;

    const assertEqual = (actual, expected, testName) => {
        totalTests++;
        if (actual === expected) {
            console.log(`${testName}`);
            testPassed++;
        } else {
            console.error(`{testName}\n   Expected: ${expected}\n   Got: ${actual}`);
        }
    };

    let students = ["Alice", "Bob", "Charlie"];
    addStudent(students, "David", 1);
    assertEqual(students.join(","), "Alice,David,Bob,Charlie", "Add 'David' at position 1");

    addStudent(students, "Eve", 0);
    assertEqual(students[0], "Eve", "Add 'Eve' at beginning");

    addStudent(students, "Frank", students.length);
    assertEqual(students[students.length - 1], "Frank", "Add 'Frank' at end");

    assertEqual(isStudentPresent(students, "Bob"), true, "Search existing student 'Bob'");

    assertEqual(isStudentPresent(students, "Zoe"), false, "Search non-existing student 'Zoe'");

    const joined = joinStudents(["A", "B", "C"]);
    assertEqual(joined, "A,B,C", "Join with default comma");

    const joinedDash = joinStudents(["A", "B", "C"], "-");
    assertEqual(joinedDash, "A-B-C", "Join with custom '-' separator");

}

runTests();
