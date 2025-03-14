import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import CreateProjectPage from '@/pages/projects/CreateProjectPage'
import EditProjectPage from './pages/projects/EditProjectPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} >
          <Route path='/' index element={<DashboardPage />} />
          <Route path='/projects/create' element={<CreateProjectPage />} />
          <Route path='/projects/:projectId/edit' element={<EditProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
