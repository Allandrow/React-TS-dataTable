import { DataTable } from './components/dataTable/DataTable'
import { employees } from './fixtures/employees'
import { headings } from './fixtures/headings'
import './app.css'

function App() {
  return <DataTable data={employees} headings={headings} />
}

export default App
