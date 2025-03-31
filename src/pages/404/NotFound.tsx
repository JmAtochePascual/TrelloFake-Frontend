import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-4">
      <img
        src="/TrelloFakeLogo.svg"
        alt="logo"
        className="w-36 block md:w-48" />

      <h1 className="text-4xl text-center font-extrabold text-gray-700">Página no encontrada</h1>

      <p className="text-6xl text-center text-gray-500">404</p>

      <Link
        to="/"
        className="text-center text-gray-500">
        Tal vez quieras regresar a <span className="font-bold text-primary">Proyectos</span>
      </Link>

    </div>
  )
}

export default NotFound