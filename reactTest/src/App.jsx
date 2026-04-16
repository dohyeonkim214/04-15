import { useState } from 'react'
import { Link } from 'react-router-dom'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import MovieCard from './MovieCard.jsx'
import TestState from './test/testState.jsx'
import NameInputFocus from './component/NameInputFocus.jsx'
import { movieList } from './data/movieList.js'

export default function App() {
  const [count, setCount] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const movieInfoLabel = 'App에서 받은 영화 정보'

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="Hero" />
          <img src={javascriptLogo} className="framework" alt="JavaScript logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started with React + Vite</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          id="counter"
          type="button"
          className="counter"
          onClick={() => setCount((prev) => prev + 1)}
        >
          count is {count}
        </button>
      </section>

      <div className="ticks" />

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a
                href="https://react.dev/learn"
                target="_blank"
                rel="noreferrer"
              >
                <img className="button-icon" src={javascriptLogo} alt="" />
                Learn React
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks" />
      <section id="spacer"></section>

      <section className="movie-card-section">
        {movieList.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            rating={movie.rating}
            url={movie.url}
            description={movie.description}
            fallbackImage={movie.fallbackImage}
            infoLabel={movieInfoLabel}
            selectedMovie={selectedMovie}
            onSelectMovie={setSelectedMovie}
          />
        ))}
      </section>

      <TestState />

      <section className="todo-entry-section" aria-labelledby="todo-entry-title">
        <div className="todo-entry-card">
          <p className="todo-entry-eyebrow">Practice Project</p>
          <h2 id="todo-entry-title">할 일 목록 페이지 보기</h2>
          <p className="todo-entry-copy">
            입력, 완료 체크, 삭제 버튼이 들어간 카드형 Todo List 예제를 별도 페이지로
            만들었습니다.
          </p>
          <Link className="todo-entry-link" to="/todolist">
            Todo List 페이지 열기
          </Link>
        </div>
      </section>

      <section className="name-focus-section" aria-labelledby="name-focus-section-title">
        <div className="name-focus-section-head">
          <p className="name-focus-section-kicker">New Component</p>
          <h2 id="name-focus-section-title">useRef 입력창 자동 포커스 예제</h2>
        </div>
        <NameInputFocus />
      </section>
    </>
  )
}
