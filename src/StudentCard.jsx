import { useState } from "react";

export default function StudentCard({ name, id, course, year }) {
  const [favorites, setFavorites] = useState(0);

  return (
    <div className="student-card">
      <div>
        <h3>{name}</h3>
        <div className="details">
          <div>ID: {id}</div>
          <div>Course: {course}</div>
          <div>Year: {year}</div>
        </div>
      </div>

      <button
        className={`favorite-btn ${favorites > 0 ? "active" : ""}`}
        onClick={() => setFavorites(favorites + 1)}
      >
        ♥ Favorite: {favorites}
      </button>
    </div>
  );
}
