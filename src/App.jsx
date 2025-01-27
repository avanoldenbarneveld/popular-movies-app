import './App.css'

function App() {
  const message = 'Test'

  return (
    <ul>
      {items.map((value, index) => {
        return <li key={index}>{value}</li>
      })}
    </ul>
  )
}

export default App
