import StudentCard from "./StudentCard.jsx";

// Students sorted alphabetically by last name
const students = [
  { name: "Abache, Noreal", id: "2026-001", course: "BS Information Technology", year: "3rd Year" },
  { name: "Apostol, Rhemz Jhon Cyrus C.", id: "2026-002", course: "BS Computer Science", year: "3rd Year" },
  { name: "Goot, Pholl Vincent", id: "2026-003", course: "BS Information Technology", year: "3rd Year" },
  { name: "Torres, John Francis", id: "2026-004", course: "BS Computer Science", year: "3rd Year" },
];

export default function App() {
  return (
    <div className="directory">
      <div className="directory-inner">
        <div className="directory-header">
          <h1>Student Directory</h1>
          <p>{students.length} students, sorted alphabetically</p>
        </div>

        <div className="card-list">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              id={student.id}
              course={student.course}
              year={student.year}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
