import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AuthLayout = () => {
  return (
    <>

      <main className='w-11/12 max-w-7xl mx-auto min-h-screen grid place-items-center'>
        <Outlet />
      </main>

      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

export default AuthLayout