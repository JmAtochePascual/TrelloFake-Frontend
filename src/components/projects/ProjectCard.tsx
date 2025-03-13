import { TProject } from "@/types/projectType"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { Link } from "react-router-dom"
type ProjectCardProps = {
  project: TProject
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <li className="flex justify-between items-start px-4 py-8">
      <div>
        <div className="flex flex-col gap-2">
          <Link
            to={`/projects/${project._id}`}
            className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold">
            {project.projectName}
          </Link>

          <p className="text-sm text-gray-400">
            Cliente: {project.clientName}
          </p>

          <p className="text-sm text-gray-400">
            {project.description}
          </p>
        </div>
      </div>

      <Menu
        as="div"
        className="relative flex-none">
        <MenuButton
          className="inline-flex items-center gap-2 rounded-md py-1.5 text-sm/6 font-semibold text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <EllipsisVerticalIcon className="size-6 text-gray-800" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 mt-2 flex flex-col origin-top-right rounded-xl borde bg-white px-2 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-2xl">
          <MenuItem>
            <Link
              to={`/projects/${project._id}`}
              className="w-full text-start text-gray-700 rounded-lg py-1.5 px-3 hover:text-black">
              Ver Proyecto
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to={``}
              className="w-full text-start text-gray-700 rounded-lg py-1.5 px-3 hover:text-black">
              Editar Proyecto
            </Link>
          </MenuItem>

          <MenuItem>
            <button
              type="button"
              className="w-full text-start text-red-500 rounded-lg py-1.5 px-3 hover:text-red-700">
              Eliminar Proyecto
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
        </MenuItems>
      </Menu>
    </li>
  )
}

export default ProjectCard