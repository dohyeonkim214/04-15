import { useState } from 'react'

export default function UseStateExample() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [todos, setTodos] = useState([])

  const handleAddTodo = () => {
    if (name.trim()) {
      setTodos([...todos, { id: Date.now(), text: name }])
      setName('')
    }
  }

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <section className="hook-section">
      <h2>useState Hook</h2>
      <p>상태(state)를 함수 컴포넌트에서 사용할 수 있게 해주는 hook입니다.</p>

      <div className="example">
        <h3>Example 1: Counter</h3>
        <p>현재 카운트: <strong>{count}</strong></p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>초기화</button>
      </div>

      <div className="example">
        <h3>Example 2: Todo List</h3>
        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="할 일을 입력하세요"
          />
          <button onClick={handleAddTodo}>추가</button>
        </div>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleRemoveTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
