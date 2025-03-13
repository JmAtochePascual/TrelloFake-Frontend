import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/DashboardPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} >
          <Route path='/' index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
