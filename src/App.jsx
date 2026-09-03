import { useMemo, useState } from "react";
import StudentCard from "./StudentCard.jsx";

// Students sorted alphabetically by last name
const initialStudents = [
  { name: "Abache, Noreal", id: "MCC2024-00133", course: "BS Information Technology", year: "3rd Year" },
  { name: "Apostol, Rhemz Jhon Cyrus C.", id: "MCC2024-00104", course: "BS Information Technology", year: "3rd Year" },
  { name: "Goot, Pholl Vincent", id: "MCC2024-00135", course: "BS Information Technology", year: "3rd Year" },
  { name: "Torres, John Francis", id: "MCC2024-00136", course: "BS Information Technology", year: "3rd Year" },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ name: "", id: "", course: "", year: "" });

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return students
      .filter((student) =>
        [student.name, student.id, student.course, student.year]
          .some((value) => value.toLowerCase().includes(normalizedSearch))
      )
      .sort((first, second) => first.name.localeCompare(second.name));
  }, [searchTerm, students]);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleAddStudent(event) {
    event.preventDefault();
    const newStudent = {
      ...form,
      name: form.name.trim(),
      id: form.id.trim(),
      course: form.course.trim(),
      year: form.year.trim(),
    };

    if (!newStudent.name || !newStudent.id || !newStudent.course || !newStudent.year) {
      return;
    }

    setStudents((currentStudents) => [...currentStudents, newStudent]);
    setForm({ name: "", id: "", course: "", year: "" });
  }

  function handleDeleteStudent(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );
  }

  return (
    <div className="directory">
      <div className="directory-inner">
        <div className="directory-header">
          <h1>Student Directory</h1>
          <p>{students.length} students, sorted alphabetically</p>
        </div>

        <form className="student-form" onSubmit={handleAddStudent}>
          <h2>Add student</h2>
          <div className="form-grid">
            <input name="name" value={form.name} onChange={handleFormChange} placeholder="Name" aria-label="Student name" required />
            <input name="id" value={form.id} onChange={handleFormChange} placeholder="Student ID" aria-label="Student ID" required />
            <input name="course" value={form.course} onChange={handleFormChange} placeholder="Course" aria-label="Course" required />
            <input name="year" value={form.year} onChange={handleFormChange} placeholder="Year" aria-label="Year" required />
          </div>
          <button className="add-btn" type="submit">Add student</button>
        </form>

        <label className="search-label" htmlFor="student-search">Search students</label>
        <input
          className="search-input"
          id="student-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name, ID, course, or year"
        />

        <div className="card-list">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              {...student}
              onDelete={handleDeleteStudent}
            />
          ))}
          {filteredStudents.length === 0 && <p className="empty-state">No students found.</p>}
        </div>
      </div>
    </div>
  );
}
