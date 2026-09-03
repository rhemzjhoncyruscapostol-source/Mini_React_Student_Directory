export default function StudentCard({ name, id, course, year, onDelete }) {
  const initials = name
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "ST";

  return (
    <article className="student-card">
      <div className="student-card__top">
        <div className="avatar" aria-label={`${name} initials`}>
          {initials}
        </div>

        <div className="student-info">
          <h3>{name}</h3>
          <p className="student-id">ID: {id}</p>
        </div>
      </div>

      <div className="student-meta">
        <span className="meta-tag meta-course">{course}</span>
        <span className="meta-tag meta-year">{year}</span>
      </div>

      <button type="button" className="delete-btn" onClick={() => onDelete(id)}>
        Delete
      </button>
    </article>
  );
}
