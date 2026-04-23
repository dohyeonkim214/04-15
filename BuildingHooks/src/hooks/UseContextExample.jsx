import { createContext, useContext, useState } from 'react'

// Context 생성
const ThemeContext = createContext()

// Provider 컴포넌트
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// useContext를 사용하는 컴포넌트
function ThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const styles = {
    light: {
      background: '#fff',
      color: '#000',
      border: '1px solid #ddd'
    },
    dark: {
      background: '#333',
      color: '#fff',
      border: '1px solid #666'
    }
  }

  const currentStyle = styles[theme]

  return (
    <div style={{
      padding: '20px',
      borderRadius: '8px',
      ...currentStyle
    }}>
      <p>현재 테마: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        테마 변경 ({theme === 'light' ? '다크' : '라이트'})
      </button>
    </div>
  )
}

export default function UseContextExample() {
  const [userRole, setUserRole] = useState('user')

  return (
    <section className="hook-section">
      <h2>useContext Hook</h2>
      <p>Props drilling 없이 컴포넌트 트리를 통해 값을 전달할 수 있게 해주는 hook입니다.</p>

      <div className="example">
        <h3>Example 1: Theme Context</h3>
        <ThemeProvider>
          <ThemedComponent />
        </ThemeProvider>
      </div>

      <div className="example">
        <h3>Example 2: User Role Context</h3>
        <p>역할: <strong>{userRole}</strong></p>
        <button onClick={() => setUserRole('user')}>User</button>
        <button onClick={() => setUserRole('admin')}>Admin</button>
        <button onClick={() => setUserRole('guest')}>Guest</button>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          실제 프로젝트에서는 인증 정보나 언어 설정 같은 전역 상태를 관리할 때 유용합니다.
        </p>
      </div>
    </section>
  )
}
