import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import MenuHamburguer from "@/components/MenuHamburguer"

const AppLayout = () => {
  return (
    <>
      <header className="mb-10 py-8 bg-primary">
        <div className="w-11/12 max-w-7xl mx-auto flex gap-8 items-center justify-between">
          <Logo />

          <MenuHamburguer />
        </div>
      </header>

      <main className='w-11/12 max-w-7xl mx-auto'>
        <Outlet />
      </main>

    </>
  )
}

export default AppLayout