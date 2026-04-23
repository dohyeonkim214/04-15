import { useState, useEffect } from 'react'
import UseStateExample from './hooks/UseStateExample'
import UseEffectExample from './hooks/UseEffectExample'
import UseContextExample from './hooks/UseContextExample'
import UseReducerExample from './hooks/UseReducerExample'

export default function App() {
  const [activeTab, setActiveTab] = useState('useState')

  return (
    <div className="app">
      <header>
        <h1>🎣 React Hooks Learning</h1>
        <nav>
          <button 
            className={activeTab === 'useState' ? 'active' : ''}
            onClick={() => setActiveTab('useState')}
          >
            useState
          </button>
          <button 
            className={activeTab === 'useEffect' ? 'active' : ''}
            onClick={() => setActiveTab('useEffect')}
          >
            useEffect
          </button>
          <button 
            className={activeTab === 'useContext' ? 'active' : ''}
            onClick={() => setActiveTab('useContext')}
          >
            useContext
          </button>
          <button 
            className={activeTab === 'useReducer' ? 'active' : ''}
            onClick={() => setActiveTab('useReducer')}
          >
            useReducer
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'useState' && <UseStateExample />}
        {activeTab === 'useEffect' && <UseEffectExample />}
        {activeTab === 'useContext' && <UseContextExample />}
        {activeTab === 'useReducer' && <UseReducerExample />}
      </main>
    </div>
  )
}
