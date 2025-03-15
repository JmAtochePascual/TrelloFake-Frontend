import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import CreateProjectPage from '@/pages/projects/CreateProjectPage'
import EditProjectPage from '@/pages/projects/EditProjectPage'
import ProjectDetailsPage from '@/pages/projects/ProjectDetailsPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/auth/register' element={<RegisterPage />} />
        <Route path='/auth/login' element={<LoginPage />} />

        <Route element={<AppLayout />} >
          <Route path='/' index element={<DashboardPage />} />
          <Route path='/projects/create' element={<CreateProjectPage />} />
          <Route path='/projects/:projectId' element={<ProjectDetailsPage />} />
          <Route path='/projects/:projectId/edit' element={<EditProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
