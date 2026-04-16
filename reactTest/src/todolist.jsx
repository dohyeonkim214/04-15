import { useId, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './todolist.css'

const initialTodos = [
  { id: 1, text: 'React 상태로 할 일 추가 기능 만들기', completed: false },
  { id: 2, text: '예쁜 카드 UI와 체크박스 스타일 다듬기', completed: true },
  { id: 3, text: '삭제 버튼에 휴지통 아이콘 연결하기', completed: false },
]

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M9 3.75h6a1.5 1.5 0 0 1 1.5 1.5V6h3a.75.75 0 0 1 0 1.5h-1.02l-.8 11.14A2.25 2.25 0 0 1 15.44 20.75H8.56a2.25 2.25 0 0 1-2.24-2.11L5.52 7.5H4.5a.75.75 0 0 1 0-1.5h3v-.75A1.5 1.5 0 0 1 9 3.75Zm6 2.25v-.75H9V6h6Zm-7.18 1.5.78 10.99a.75.75 0 0 0 .75.71h6.9a.75.75 0 0 0 .75-.71l.78-10.99H7.82Zm2.43 2.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V10.5a.75.75 0 0 1 .75-.75Zm3.5 0a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V10.5a.75.75 0 0 1 .75-.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function TodoListPage() {
  const inputId = useId()
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem('todos')
      return savedTodos ? JSON.parse(savedTodos) : initialTodos
    } catch {
      return initialTodos
    }
  })

  // localStorage에 todos 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedValue = inputValue.trim()

    if (!trimmedValue) {
      return
    }

    setTodos((currentTodos) => [
      {
        id: Date.now(),
        text: trimmedValue,
        completed: false,
      },
      ...currentTodos,
    ])
    setInputValue('')
  }

  const handleToggleTodo = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDeleteTodo = (todoId) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="todo-page">
      <section className="todo-shell">
        <header className="todo-hero">
          <div>
            <p className="todo-kicker">Daily Flow</p>
            <h1 className="todo-title">Todo List</h1>
            <p className="todo-subtitle">
              오늘 해야 할 일을 빠르게 적고, 카드에서 바로 완료 또는 삭제할 수 있습니다.
            </p>
          </div>

          <Link className="todo-back-link" to="/">
            홈으로 돌아가기
          </Link>
        </header>

        <section className="todo-panel" aria-labelledby="todo-form-title">
          <div className="todo-panel-copy">
            <p className="todo-panel-label">Task Input</p>
            <h2 id="todo-form-title">새 할 일 추가</h2>
            <p>입력창에 내용을 적고 추가 버튼을 누르면 카드가 바로 생성됩니다.</p>
          </div>

          <form className="todo-form" onSubmit={handleSubmit}>
            <label className="todo-input-label" htmlFor={inputId}>
              할 일 내용
            </label>
            <div className="todo-input-row">
              <input
                id={inputId}
                className="todo-input"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="예: 내일 발표 자료 최종 점검하기"
              />
              <button className="todo-add-button" type="submit">
                추가
              </button>
            </div>
          </form>

          <div className="todo-summary" aria-label="todo summary">
            <div>
              <strong>{todos.length}</strong>
              <span>전체 할 일</span>
            </div>
            <div>
              <strong>{completedCount}</strong>
              <span>완료한 일</span>
            </div>
            <div>
              <strong>{todos.length - completedCount}</strong>
              <span>남은 일</span>
            </div>
          </div>
        </section>

        <section className="todo-list-section" aria-labelledby="todo-list-title">
          <div className="todo-list-header">
            <h2 id="todo-list-title">할 일 목록</h2>
            <p>카드를 눌러 상태를 확인하고 체크박스와 휴지통 버튼으로 관리하세요.</p>
          </div>

          {todos.length > 0 ? (
            <div className="todo-grid">
              {todos.map((todo, index) => (
                <article
                  key={todo.id}
                  className={`todo-card${todo.completed ? ' is-completed' : ''}`}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="todo-card-top">
                    <span className="todo-badge">
                      {todo.completed ? '완료됨' : '진행 중'}
                    </span>
                    <button
                      className="todo-delete-button"
                      type="button"
                      onClick={() => handleDeleteTodo(todo.id)}
                      aria-label={`${todo.text} 삭제`}
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  <p className="todo-card-text">{todo.text}</p>

                  <label className="todo-checkbox-row">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <span>완료</span>
                  </label>
                </article>
              ))}
            </div>
          ) : (
            <div className="todo-empty-state">
              <h3>아직 등록된 할 일이 없습니다.</h3>
              <p>위 입력창에 첫 번째 할 일을 추가해 보세요.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}