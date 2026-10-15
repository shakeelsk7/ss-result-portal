const form = document.getElementById("resultForm");
const message = document.getElementById("message");
const resultCard = document.getElementById("resultCard");

const demoResults = {
  "123456-10th-2026": {
    name: "Demo Student",
    subjects: [
      { name: "English", obtained: 75, total: 100 },
      { name: "Urdu", obtained: 78, total: 100 },
      { name: "Physics", obtained: 65, total: 100 },
      { name: "Mathematics", obtained: 80, total: 100 },
      { name: "Computer", obtained: 85, total: 100 }
    ]
  },
  "123457-11th-2026": {
    name: "Demo ICS Student",
    subjects: [
      { name: "English", obtained: 72, total: 100 },
      { name: "Urdu", obtained: 68, total: 100 },
      { name: "Physics", obtained: 55, total: 100 },
      { name: "Mathematics", obtained: 61, total: 100 },
{ name: "Computer Science", obtained: 30, total: 100 },  
    { name: "Islamiat", obtained: 42, total: 50 },
      { name: "Tarjamat-ul-Quran", obtained: 44, total: 50 }
    ]
  }
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const board = document.getElementById("board").value;
  const roll = document.getElementById("roll").value.trim();
  const className = document.getElementById("className").value;
  const year = document.getElementById("year").value;

  resultCard.hidden = true;

  if (!/^\d+$/.test(roll)) {
    message.textContent = "Please enter a valid numeric roll number.";
    message.style.color = "#c62828";
    return;
  }

  const key = `${roll}-${className}-${year}`;
  const student = demoResults[key];

  if (!student) {
    message.textContent =
      "No demo record found. Try roll number 123456, Class 10th, Year 2026.";
    message.style.color = "#c62828";
    return;
  }

  const total = student.subjects.reduce((sum, subject) => sum + subject.total, 0);
  const obtained = student.subjects.reduce((sum, subject) => sum + subject.obtained, 0);
  const percentage = ((obtained / total) * 100).toFixed(2);

  document.getElementById("studentName").textContent = student.name;
  document.getElementById("resultRoll").textContent = roll;
  document.getElementById("resultBoard").textContent = "BISE Bahawalpur";
  document.getElementById("resultClass").textContent = className;
  document.getElementById("resultYear").textContent = year;

  const marksBody = document.getElementById("subjectMarks");
  marksBody.replaceChildren();

  student.subjects.forEach((subject) => {
    const row = document.createElement("tr");
[subject.name, subject.obtained, subject.total].forEach((value) => {
  const cell = document.createElement("td");
  cell.textContent = value;
  row.appendChild(cell);
});

const statusCell = document.createElement("td");
statusCell.textContent =
  subject.obtained / subject.total >= 0.4 ? "PASS" : "SUPPLY";
row.appendChild(statusCell);

    marksBody.appendChild(row);
  });

  document.getElementById("totalMarks").textContent = total;
  document.getElementById("obtainedMarks").textContent = obtained;
  document.getElementById("percentage").textContent = percentage + "%";
const hasSupply = student.subjects.some(
  (subject) => subject.obtained / subject.total < 0.4
);

document.getElementById("resultStatus").textContent =
  hasSupply ? "SUPPLY" : "PASS";
  message.textContent = "Demo record found!";
  message.style.color = "#16794b";
  resultCard.hidden = false;
});
