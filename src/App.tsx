import { DataTable } from './components/dataTable/DataTable'
import { employees } from './fixtures/employees'
import { columns } from './fixtures/columns'

function App() {
  return <DataTable data={employees} columns={columns} />
}

export default App
