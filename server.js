const express = require("express");
const app = express();
app.use(express.json());

// Temporary in-memory database
let students = [
    { id: 1, name: "John", marks: 85 },
    { id: 2, name: "Sara", marks: 90 }
];

// ▶️ GET – Fetch all students
app.get("/students", (req, res) => {
    res.json(students);
});

// ▶️ POST – Add new student
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        marks: req.body.marks
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// ▶️ PATCH – Update student by ID
app.patch("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    if (req.body.name) student.name = req.body.name;
    if (req.body.marks) student.marks = req.body.marks;

    res.json(student);
});

// ▶️ DELETE – Remove student by ID
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.json({ message: "Student deleted" });
});

// ▶️ Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
