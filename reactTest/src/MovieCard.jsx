import { useState } from 'react'

export default function MovieCard({
  title,
  rating,
  url,
  description,
  fallbackImage,
  infoLabel,
  selectedMovie,
  onSelectMovie,
}) {
  const [posterSrc, setPosterSrc] = useState(url)
  const isSelected = selectedMovie?.title === title

  const handleClick = () => {
    onSelectMovie({ title, rating, description })
  }

  return (
    <article className="movie-card" aria-label="movie card">
      <img
        className="movie-card-poster"
        src={posterSrc}
        alt={`${title} 포스터`}
        loading="lazy"
        onError={() => setPosterSrc(fallbackImage)}
      />
      <div className="movie-card-body">
        <h3 className="movie-card-title">{title}</h3>
        <p className="movie-card-rating">{rating}</p>
        <button className="movie-card-button" type="button" onClick={handleClick}>
          영화 정보 보기
        </button>
        {isSelected ? (
          <p className="movie-card-selected-info">
            {infoLabel}: {selectedMovie.title} | {selectedMovie.rating}
          </p>
        ) : null}
        <p className="movie-card-description">{description}</p>
      </div>
    </article>
  )
}
