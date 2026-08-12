document.getElementById("gradeForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let marks = document.getElementById("marks").value;
    let result = document.getElementById("result");

    // Validation
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (marks === "") {
        alert("Please enter marks.");
        return;
    }

    marks = Number(marks);

    if (marks < 0 || marks > 100) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    let grade;

    // Control Structure
    if (marks >= 90) {
        grade = "A+";
    }
    else if (marks >= 80) {
        grade = "A";
    }
    else if (marks >= 70) {
        grade = "B";
    }
    else if (marks >= 60) {
        grade = "C";
    }
    else if (marks >= 50) {
        grade = "D";
    }
    else {
        grade = "F (Fail)";
    }

    result.style.display = "block";

    result.innerHTML = `
        <h3>Result</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Marks:</strong> ${marks}</p>
        <p><strong>Grade:</strong> ${grade}</p>
    `;

});


