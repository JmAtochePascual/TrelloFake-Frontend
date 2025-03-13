import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import CreateProjectPage from '@/pages/projects/CreateProjectPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} >
          <Route path='/' index element={<DashboardPage />} />
          <Route path='/projects/create' element={<CreateProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
