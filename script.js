let currentIndex = 0;
const students = [];

fetch('Students.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const studentNodes = xml.querySelectorAll('Student');

        studentNodes.forEach(studentNode => {
            const matricNo = studentNode.querySelector('MatricNo').textContent;
            const firstName = studentNode.querySelector('FirstName').textContent;
            const lastName = studentNode.querySelector('LastName').textContent;
            const contactNo = studentNode.querySelector('ContactNo').textContent;
            const email = studentNode.querySelector('Email').textContent;
            const address = studentNode.querySelector('Address').textContent;
            const city = studentNode.querySelector('City').textContent;
            const state = studentNode.querySelector('State').textContent;
            const postcode = studentNode.querySelector('Postcode').textContent;

            students.push({
                matricNo,
                firstName,
                lastName,
                contactNo,
                email,
                address,
                city,
                state,
                postcode
            });
        });

        displayStudent();
    })
    .catch(error => console.error('Error fetching data:', error));

function displayStudent(searchQuery = '') {
    const filteredStudents = students.filter(student => {
        const searchLowerCase = searchQuery.toLowerCase();
        return (
            student.matricNo.toLowerCase().includes(searchLowerCase) ||
            student.firstName.toLowerCase().includes(searchLowerCase) ||
            student.lastName.toLowerCase().includes(searchLowerCase) ||
            student.contactNo.toLowerCase().includes(searchLowerCase) ||
            student.email.toLowerCase().includes(searchLowerCase) ||
            student.address.toLowerCase().includes(searchLowerCase) ||
            student.city.toLowerCase().includes(searchLowerCase)
        );
    });

    if (filteredStudents.length > 0) {
        const student = filteredStudents[currentIndex];
        const studentInfo = `
            <div>
                <p><strong>Matric No:</strong> ${student.matricNo}</p>
                <p><strong>First Name:</strong> ${student.firstName}</p>
                <p><strong>Last Name:</strong> ${student.lastName}</p>
                <p><strong>Contact No:</strong> ${student.contactNo}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Address:</strong> ${student.address}</p>
                <p><strong>City:</strong> ${student.city}</p>
                <p><strong>State:</strong> ${student.state}</p>
                <p><strong>Postcode:</strong> ${student.postcode}</p>
            </div>
        `;
        document.getElementById('student-info').innerHTML = studentInfo;
    } else {
        document.getElementById('student-info').innerHTML = "<p>No matching student found.</p>";
    }
}

function searchStudent() {
    const searchInput = document.getElementById('searchInput').value;
    displayStudent(searchInput);
}

function prevStudent() {
    if (currentIndex > 0) {
        currentIndex--;
        displayStudent(document.getElementById('searchInput').value);
    }
}

function nextStudent() {
    if (currentIndex < students.length - 1) {
        currentIndex++;
        displayStudent(document.getElementById('searchInput').value);
    }
}
