import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import CreateProjectPage from '@/pages/projects/CreateProjectPage'
import EditProjectPage from '@/pages/projects/EditProjectPage'
import ProjectDetailsPage from '@/pages/projects/ProjectDetailsPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import ResentTokenPage from './pages/auth/ResentTokenPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ConfirmAccountPage from './pages/auth/ConfirmAccountPage'
import UpdatePasswordPage from './pages/auth/UpdatePasswordPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/auth/register' element={<RegisterPage />} />
        <Route path='/auth/login' element={<LoginPage />} />

        <Route element={<AuthLayout />} >
          <Route path='/auth/confirm-account' element={<ConfirmAccountPage />} />
          <Route path='/auth/resent-token' element={<ResentTokenPage />} />
          <Route path='/auth/reset-password' element={<UpdatePasswordPage />} />
          <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
        </Route>

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
