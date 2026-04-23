import { useReducer } from 'react'

// Action types
const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO'
}

// Reducer 함수
function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return state + 1
    case ACTIONS.DECREMENT:
      return state - 1
    case ACTIONS.RESET:
      return 0
    default:
      return state
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false
        }
      ]
    case ACTIONS.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload)
    case ACTIONS.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

export default function UseReducerExample() {
  const [count, dispatchCount] = useReducer(counterReducer, 0)
  const [todos, dispatchTodos] = useReducer(todoReducer, [])
  const [input, setInput] = useReducer((state, action) => {
    if (action.type === 'SET') return action.payload
    if (action.type === 'CLEAR') return ''
    return state
  }, '')

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatchTodos({ type: ACTIONS.ADD_TODO, payload: input })
      dispatchTodos({ type: 'CLEAR' }) // 이건 작동 안 함, input 변경 필요
      setInput('')
    }
  }

  return (
    <section className="hook-section">
      <h2>useReducer Hook</h2>
      <p>복잡한 상태 로직을 관리할 때 useState 대신 사용할 수 있는 hook입니다. 여러 개의 상태를 하나의 reducer로 관리합니다.</p>

      <div className="example">
        <h3>Example 1: Counter with useReducer</h3>
        <p>현재 카운트: <strong>{count}</strong></p>
        <button onClick={() => dispatchCount({ type: ACTIONS.INCREMENT })}>
          +1
        </button>
        <button onClick={() => dispatchCount({ type: ACTIONS.DECREMENT })}>
          -1
        </button>
        <button onClick={() => dispatchCount({ type: ACTIONS.RESET })}>
          초기화
        </button>
      </div>

      <div className="example">
        <h3>Example 2: Todo List with useReducer</h3>
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="할 일을 입력하세요"
          />
          <button onClick={handleAddTodo}>추가</button>
        </div>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.6 : 1
            }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatchTodos({
                  type: ACTIONS.TOGGLE_TODO,
                  payload: todo.id
                })}
              />
              {todo.text}
              <button onClick={() => dispatchTodos({
                type: ACTIONS.REMOVE_TODO,
                payload: todo.id
              })}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="example">
        <h3>장점</h3>
        <ul>
          <li>복잡한 상태 로직을 체계적으로 관리할 수 있습니다</li>
          <li>상태 업데이트 로직이 분리되어 테스트하기 쉽습니다</li>
          <li>깊은 nested state를 처리하기 좋습니다</li>
          <li>Redux로 마이그레이션할 때 유사한 패턴을 사용합니다</li>
        </ul>
      </div>
    </section>
  )
}
