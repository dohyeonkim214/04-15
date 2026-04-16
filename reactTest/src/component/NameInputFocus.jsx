import { useEffect, useRef, useState } from 'react'

export default function NameInputFocus() {
  const inputRef = useRef(null)
  const [name, setName] = useState('')
  const [savedName, setSavedName] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSaveName = () => {
    setSavedName(name.trim())
  }

  const handleResetAndFocus = () => {
    setName('')
    setSavedName('')
    inputRef.current?.focus()
  }

  return (
    <section
      aria-labelledby="name-focus-title"
      style={{
        padding: '0 20px 100px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 'min(720px, 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(17, 24, 39, 0.1)',
          background:
            'radial-gradient(circle at right top, rgba(251, 146, 60, 0.2), transparent 30%), linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          boxShadow: '0 24px 50px rgba(15, 23, 42, 0.12)',
          padding: '28px',
          textAlign: 'left',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontSize: '13px',
            fontWeight: 800,
            color: '#b45309',
          }}
        >
          useRef Practice
        </p>
        <h2 id="name-focus-title" style={{ margin: '10px 0 8px' }}>
          입력창 자동 포커스 및 초기화
        </h2>
        <p style={{ margin: '0 0 16px' }}>
          컴포넌트가 나타나면 자동으로 입력창에 포커스되고, 초기화 버튼으로 다시 입력
          상태로 돌아갑니다.
        </p>

        <label
          htmlFor="name-input-ref"
          style={{ display: 'block', marginBottom: '8px', fontWeight: 700, color: '#0f172a' }}
        >
          이름
        </label>
        <input
          id="name-input-ref"
          ref={inputRef}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="이름을 입력하세요"
          style={{
            width: '100%',
            height: '46px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            padding: '0 14px',
            boxSizing: 'border-box',
            fontSize: '15px',
            marginBottom: '12px',
          }}
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleSaveName}
            style={{
              border: 'none',
              borderRadius: '12px',
              padding: '10px 16px',
              fontWeight: 700,
              background: '#0f172a',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            이름 저장
          </button>
          <button
            type="button"
            onClick={handleResetAndFocus}
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '10px 16px',
              fontWeight: 700,
              background: '#f8fafc',
              color: '#0f172a',
              cursor: 'pointer',
            }}
          >
            초기화하고 다시 입력
          </button>
        </div>

        <p style={{ margin: '14px 0 0', fontWeight: 600, color: '#1e293b' }}>
          저장된 이름: {savedName || '아직 없음'}
        </p>
      </div>
    </section>
  )
}