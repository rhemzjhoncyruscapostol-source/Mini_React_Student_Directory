import { useMemo, useState } from "react";
import StudentCard from "./StudentCard.jsx";

const initialStudents = [
  { name: "Abache, Noreal", id: "MCC2024-00133", course: "BS Information Technology", year: "3rd Year", favorite: false },
  { name: "Apostol, Rhemz Jhon Cyrus C.", id: "MCC2024-00104", course: "BS Information Technology", year: "3rd Year", favorite: true },
  { name: "Goot, Pholl Vincent", id: "MCC2024-00135", course: "BS Computer Science", year: "2nd Year", favorite: false },
  { name: "Torres, John Francis", id: "MCC2024-00136", course: "BS Information Technology", year: "4th Year", favorite: false },
  { name: "Delgado, Maria Claire", id: "MCC2024-00147", course: "BS Psychology", year: "2nd Year", favorite: true },
  { name: "Lacson, Adrian", id: "MCC2024-00152", course: "BS Computer Science", year: "1st Year", favorite: false },
];

const defaultForm = { name: "", id: "", course: "", year: "" };

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All courses");
  const [selectedYear, setSelectedYear] = useState("All years");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const courseOptions = useMemo(
    () => ["All courses", ...new Set(students.map((student) => student.course))],
    [students]
  );

  const yearOptions = useMemo(
    () => ["All years", ...new Set(students.map((student) => student.year))],
    [students]
  );

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return students
      .filter((student) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          [student.name, student.id, student.course, student.year]
            .some((value) => value.toLowerCase().includes(normalizedSearch));

        const matchesCourse =
          selectedCourse === "All courses" || student.course === selectedCourse;
        const matchesYear = selectedYear === "All years" || student.year === selectedYear;

        return matchesSearch && matchesCourse && matchesYear;
      })
      .sort((first, second) => first.name.localeCompare(second.name));
  }, [searchTerm, selectedCourse, selectedYear, students]);

  const stats = useMemo(() => {
    const totalFavorites = students.filter((student) => student.favorite).length;
    const totalCourses = new Set(students.map((student) => student.course)).size;

    return {
      totalStudents: students.length,
      visibleStudents: filteredStudents.length,
      favoriteStudents: totalFavorites,
      totalCourses,
    };
  }, [filteredStudents.length, students]);

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
      favorite: false,
    };

    if (!newStudent.name || !newStudent.id || !newStudent.course || !newStudent.year) {
      return;
    }

    setStudents((currentStudents) =>
      [...currentStudents, newStudent].sort((first, second) => first.name.localeCompare(second.name))
    );
    setForm(defaultForm);
    setShowForm(false);
    setSelectedCourse("All courses");
    setSelectedYear("All years");
  }

  function handleDeleteStudent(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );
  }

  function handleToggleFavorite(studentId) {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId ? { ...student, favorite: !student.favorite } : student
      )
    );
  }

  return (
    <div className="directory-shell">
      <div className="directory-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Academic overview</p>
            <h1>Student Directory</h1>
          </div>
          <button className="primary-button" type="button" onClick={() => setShowForm((open) => !open)}>
            {showForm ? "Close form" : "+ Add student"}
          </button>
        </header>

        <section className="stats-grid" aria-label="Student summary statistics">
          <div className="stat-card">
            <span>Total students</span>
            <strong>{stats.totalStudents}</strong>
          </div>
          <div className="stat-card">
            <span>Visible</span>
            <strong>{stats.visibleStudents}</strong>
          </div>
          <div className="stat-card">
            <span>Favorites</span>
            <strong>{stats.favoriteStudents}</strong>
          </div>
          <div className="stat-card">
            <span>Programs</span>
            <strong>{stats.totalCourses}</strong>
          </div>
        </section>

        <section className="toolbar">
          <label className="search-field" htmlFor="student-search">
            <span>Search</span>
            <input
              id="student-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, ID, course, or year"
            />
          </label>

          <div className="filter-row">
            <label>
              <span>Course</span>
              <select value={selectedCourse} onChange={(event) => setSelectedCourse(event.target.value)}>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Year level</span>
              <select value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {showForm && (
          <form className="student-form" onSubmit={handleAddStudent}>
            <div className="form-header">
              <h2>Add student</h2>
              <p>New entries appear instantly in the directory.</p>
            </div>

            <div className="form-grid">
              <input name="name" value={form.name} onChange={handleFormChange} placeholder="Full name" aria-label="Student name" required />
              <input name="id" value={form.id} onChange={handleFormChange} placeholder="Student ID" aria-label="Student ID" required />
              <input name="course" value={form.course} onChange={handleFormChange} placeholder="Course" aria-label="Course" required />
              <input name="year" value={form.year} onChange={handleFormChange} placeholder="Year level" aria-label="Year" required />
            </div>

            <div className="form-actions">
              <button className="secondary-button" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button className="primary-button" type="submit">
                Save student
              </button>
            </div>
          </form>
        )}

        <div className="directory-header-row">
          <h2>Directory</h2>
          <span>{filteredStudents.length} result{filteredStudents.length === 1 ? "" : "s"}</span>
        </div>

        <div className="card-list">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              {...student}
              onDelete={handleDeleteStudent}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}

          {filteredStudents.length === 0 && (
            <div className="empty-state">
              <h3>No students found</h3>
              <p>Try another search or add a new record.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
