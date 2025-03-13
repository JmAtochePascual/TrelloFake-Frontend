import { Link } from "react-router-dom"

const DashboardPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-black text-gray-800 md:text-5xl">Crea un Proyecto</h1>
        <p className="text-gray-600">Accede, gestiona y colabora en todos tus proyectos fácilmente.</p>
      </div>

      <nav className="mb-12">
        <Link
          to="/projects/create"
          className="mb-12 px-4 py-2 text-white bg-primary hover:bg-secondary">
          Crear Proyecto
        </Link>
      </nav>

      <p>Lista de Proyectos</p>
    </>
  )
}

export default DashboardPage