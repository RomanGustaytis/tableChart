import { useState } from 'react'
import TableWithChart from "./components/TableWithChart/TableWithChart.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TableWithChart />
    </>
  )
}

export default App
