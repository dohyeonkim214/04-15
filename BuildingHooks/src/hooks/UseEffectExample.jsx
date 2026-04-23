import { useState, useEffect } from 'react'

export default function UseEffectExample() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // Example 1: 마운트될 때만 실행
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다')
    return () => {
      console.log('컴포넌트가 언마운트될 예정입니다')
    }
  }, [])

  // Example 2: count가 변경될 때마다 실행
  useEffect(() => {
    console.log(`Count가 ${count}로 변경되었습니다`)
    document.title = `Count: ${count}`
  }, [count])

  // Example 3: 데이터 페칭
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 실제로는 API 호출을 여기서 합니다
        await new Promise(resolve => setTimeout(resolve, 1000))
        setData(`Loaded at ${new Date().toLocaleTimeString()}`)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (count > 0) {
      fetchData()
    }
  }, [count])

  // Example 4: 윈도우 리사이즈 리스너
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="hook-section">
      <h2>useEffect Hook</h2>
      <p>컴포넌트의 생명주기(마운트, 업데이트, 언마운트)에서 작업을 수행할 수 있게 해주는 hook입니다.</p>

      <div className="example">
        <h3>Example 1: Counter with useEffect</h3>
        <p>count 값: <strong>{count}</strong></p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <p style={{ fontSize: '0.9em', color: '#666' }}>콘솔을 확인해보세요</p>
      </div>

      <div className="example">
        <h3>Example 2: Data Fetching</h3>
        <p>Count를 증가시키면 데이터를 로드합니다</p>
        {loading && <p>로딩 중...</p>}
        {data && <p>✓ {data}</p>}
      </div>

      <div className="example">
        <h3>Example 3: Window Size</h3>
        <p>창 크기: <strong>{windowSize.width} x {windowSize.height}</strong></p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>창을 리사이즈해보세요</p>
      </div>
    </section>
  )
}
