import StudentCard from "./StudentCard.jsx";

// Students sorted alphabetically by last name
const students = [
  { name: "Abache, Noreal", id: "MCC2024-00133", course: "BS Information Technology", year: "3rd Year" },
  { name: "Apostol, Rhemz Jhon Cyrus C.", id: "MCC2024-00104", course: "BS Information Technology", year: "3rd Year" },
  { name: "Goot, Pholl Vincent", id: "MCC2024-00135", course: "BS Information Technology", year: "3rd Year" },
  { name: "Torres, John Francis", id: "MCC2024-00136", course: "BS Information Technology", year: "3rd Year" },
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
