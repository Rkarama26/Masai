
//https://6887c05a071f195ca981ddf3.mockapi.io/students

const container = document.getElementById('container');
let editingStudentId = null;


// READ Students
async function readStudentsData() {
    try {
        let response = await fetch('https://6887c05a071f195ca981ddf3.mockapi.io/students');
        let data = await response.json();

        container.innerHTML = ''; // Clear old
        data.forEach((student) => {
            let div = document.createElement('div');
            div.classList.add('student');
            div.setAttribute('data-id', student.id);

            div.innerHTML = `
            <h2>Name: ${student.name}</h2>
            <p>Course: ${student.course}</p>
            <p>Age: ${student.age}</p>
            <button class="deleteBtn">Delete</button>
            <button class="updateBtn">Update</button>
          `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error(error);
    }
}
readStudentsData();

// CREATE or UPDATE Student
document.getElementById('studentForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const course = document.getElementById('course').value.trim();
    const age = parseInt(document.getElementById('age').value);

    if (!name || !course || isNaN(age)) {
        alert('Please fill all fields correctly.');
        return;
    }

    const studentData = { name, course, age };

    try {
        if (editingStudentId) {
            // UPDATE student
            const response = await fetch(`https://6887c05a071f195ca981ddf3.mockapi.io/students/${editingStudentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            if (!response.ok) throw new Error('Failed to update student');
            readStudentsData();

        } else {
            // CREATE student
            const response = await fetch('https://6887c05a071f195ca981ddf3.mockapi.io/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            if (!response.ok) throw new Error('Failed to create student');
            readStudentsData();

        }

        editingStudentId = null;
        e.target.reset();
        document.getElementById('submitBtn').textContent = "Add Student";

    } catch (error) {
        console.error(error);
    }
});

// DELETE or Start UPDATE
container.addEventListener("click", async function (e) {
    const studentDiv = e.target.closest('.student');
    const studentId = studentDiv.getAttribute('data-id');

    // DELETE
    if (e.target.classList.contains('deleteBtn')) {
        try {
            const response = await fetch(`https://6887c05a071f195ca981ddf3.mockapi.io/students/${studentId}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error(`Failed to delete student`);
            studentDiv.remove();
        } catch (error) {
            console.error(error);
        }
    }

    // UPDATE 
    if (e.target.classList.contains('updateBtn')) {
        const name = studentDiv.querySelector('h2').textContent.replace('Name: ', '');
        const course = studentDiv.querySelectorAll('p')[0].textContent.replace('Course: ', '');
        const age = studentDiv.querySelectorAll('p')[1].textContent.replace('Age: ', '');

        document.getElementById('name').value = name;
        document.getElementById('course').value = course;
        document.getElementById('age').value = age;
        editingStudentId = studentId;
        document.getElementById('submitBtn').textContent = "Update Student";
    }
});

// delete student
container.addEventListener("click", async function (e) {

    if (e.target.classList.contains('deleteBtn')) {
        const studentDiv = e.target.closest('.student');
        const studentId = studentDiv.getAttribute('data-id');

        try {
            const response = await fetch(`https://6887c05a071f195ca981ddf3.mockapi.io/students/${studentId}`,
                {
                    method: "DELETE"
                });
            if (!response.ok) throw new Error(`Failed to delete task. Status: ${response.status}`);

            const deletedstudent = await response.json();
            studentDiv.remove();

            console.log('Deleted :', deletedstudent);
        } catch (error) {
            console.error(error)
        }
    }
})































