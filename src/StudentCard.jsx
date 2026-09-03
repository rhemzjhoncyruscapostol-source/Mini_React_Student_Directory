export default function StudentCard({
  name,
  id,
  course,
  year,
  favorite,
  onDelete,
  onToggleFavorite,
}) {
  const initials = name
    .split(/[,\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "ST";

  return (
    <article className={`student-card ${favorite ? "is-favorite" : ""}`}>
      <div className="student-card__top">
        <div className="avatar" aria-label={`${name} initials`}>
          {initials}
        </div>

        <div className="student-info">
          <h3>{name}</h3>
          <p className="student-id">ID: {id}</p>
        </div>
      </div>

      <div className="student-tags">
        <span className="tag tag-course">{course}</span>
        <span className="tag tag-year">{year}</span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(id)}
        >
          {favorite ? "★ Saved" : "☆ Save"}
        </button>
        <button type="button" className="delete-btn" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
