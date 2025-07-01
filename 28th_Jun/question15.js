function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];
    students.splice(1, 0, "David");
    console.log("Contains 'Eve'? =>", students.includes("Eve"));
    console.log("Comma-separated list =>", students.join(","));
    return students;
}

let updatedStudents = manageStudents();

function runStudentTests() {
    let testCount = 0, passed = 0;

    function assertEqual(actual, expected, message) {
        testCount++;
        if (actual === expected) {
            console.log(`${message}`);
            passed++;
        } else {
            console.error(`${message}\n   Expected: ${expected}\n   Got: ${actual}`);
        }
    }

    assertEqual(updatedStudents.length, 4, "Length should be 4 after insertion");
    assertEqual(updatedStudents[1], "David", "'David' should be at index 1");
    assertEqual(updatedStudents.includes("Eve"), false, "'Eve' should not be present");
    assertEqual(updatedStudents.join(","), "Alice,David,Bob,Charlie", "Check final joined string");

    updatedStudents.splice(updatedStudents.length, 0, "Eve");
    assertEqual(updatedStudents.includes("Eve"), true, "'Eve' should be present after adding");

    console.log(`\nTests Passed: ${passed}/${testCount}`);
}

runStudentTests();
