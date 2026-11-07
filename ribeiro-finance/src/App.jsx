import { FinanceProvider } from './contexts/FinanceContext'
import Router from './Router'

function App() {
  return (
    <FinanceProvider>
      <Router />
    </FinanceProvider>
  )
}

export default App
