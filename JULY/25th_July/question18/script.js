

// base url - 
// https://students-9834b-default-rtdb.asia-southeast1.firebasedatabase.app/

// fetch("https://students-9834b-default-rtdb.asia-southeast1.firebasedatabase.app/students.json")
// .then((res) => res.json())
// .then((data) => console.log(data))

// .catch(error => {
//     console.error('Error fetching data: ', error);
// })


let students = [];
let editId = null;

//get students 
async function fetchStudents() {
    let res = await fetch("https://students-9834b-default-rtdb.asia-southeast1.firebasedatabase.app/students.json")
    let data = await res.json()
    // console.log(data)// object 

    // 1. way
    /*    let students = Object.entries(data) // object to key-value pair Array
            .map(([id, student]) => ( // deStructure the array
                {
                    id,
                    ...student
                }))  // return a new Array spreading student elements
        console.log(students) // array
            */

    // 2. way

    students = Object.entries(data)
        .map(([id, student]) => ({ id, ...student }))
        .sort((a, b) => a.name.localeCompare(b.name));

    console.log("fetched: ", students)
    renderlist(students)

}
fetchStudents()
//create Students
async function addStudent() {

    let student = {
        name: document.getElementById("name").value.trim(),
        age: parseInt(document.getElementById("age").value),
        enrolled: document.getElementById("enrolled").checked,
        grade: document.getElementById('grade').value.trim()
    }
    if (!name || !age || !grade) {
        alert("Please fill in all required fields.");
        return;
    }

    let url = "https://students-9834b-default-rtdb.asia-southeast1.firebasedatabase.app/students"

    if (editId) {
        url += `/${student.id}.json`; //  for update
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify(student),
            headers: {
                "Content-Type": "application/json"
            }
        });
        editId = null;
    }
    else {
        url += `.json`
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(student)
        })
    }


    clearForm()

    fetchStudents()
}

//delete student
async function deleteStudent(id) {
    const res = await fetch(`https://students-9834b-default-rtdb.asia-southeast1.firebasedatabase.app/students/${id}.json`, {
        method: "DELETE"
    });

    if (res.ok) {

        fetchStudents(); // Refresh list
    } else {
        alert("Failed to delete student.");
    }
}



//display students 
function renderlist(students) {
    let studentList = document.getElementById('list')
    studentList.innerHTML = "";
    students.forEach((student) => {

        let div = document.createElement('div')
        div.innerHTML = `
          <h3>Name: ${student.name}</h3>
          <p>Grade: ${student.grade}</p>
          <p>Age: ${student.age}</p>
          <p>Enrolled: ${student.enrolled}</p>
          <button onclick="deleteStudent('${student.id}')">Delete</button>
        `
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editStudent(student.id, student);

        div.appendChild(editBtn)
        studentList.appendChild(div);
    });
}

// filter by enrolled status
function enrolledStudents() {
    let enrolledStudents = students.filter(student => student.enrolled);
    console.log("filter by enrolled", enrolledStudents)
    renderlist(enrolledStudents)
}

//filter by Grade
function filterBySelectedGrade() {
    const selectedGrade = document.getElementById('selected_grade').value;

    if (selectedGrade === "") {
        renderlist(students); // Show all students if nothing is selected
        return;
    }

    const filteredStudents = students.filter(student => student.grade === selectedGrade);
    console.log(filteredStudents)
    renderlist(filteredStudents);
}

// sort by Age
function sortStudentsByAge() {
    console.log("students", students)
    const sortedByAge = [...students].sort((a, b) => a.age - b.age);
    console.log(sortedByAge)
    renderlist(sortedByAge);
}


function editStudent(id, studentData) {
    document.getElementById("name").value = studentData.name;
    document.getElementById("age").value = studentData.age;
    document.getElementById("grade").value = studentData.grade;
    document.getElementById("enrolled").checked = studentData.enrolled;
    editId = id; // for update
}


function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("enrolled").checked = false;
}
