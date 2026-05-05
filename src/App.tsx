import { BrowserRouter } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { AuthProvider } from './features/auth/AuthProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App