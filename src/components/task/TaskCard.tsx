import { TProjectTask } from "@/types/projectType"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { Link, useNavigate } from "react-router-dom"

type TaskCardProps = {
  task: TProjectTask
}

const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate();

  return (
    <li className="p-4 flex justify-between items-start gap-3 border border-slate-200 bg-white">

      <div className="flex flex-col gap-1">
        <button
          type="button"
          className="font-bold text-start">
          {task.name}
        </button>

        <p className="text-sm text-gray-500">{task.description}</p>
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
          className="w-40 mt-2 flex flex-col origin-top-right rounded-xl border bg-white px-2 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-2xl">
          <MenuItem>
            <Link
              to={''}
              className="w-full text-start text-gray-700 rounded-lg py-1.5 px-3 hover:text-black">
              Ver Tarea
            </Link>
          </MenuItem>

          <MenuItem>
            <button
              onClick={() => navigate('?editTask=' + task._id)}
              className="w-full text-start text-gray-700 rounded-lg py-1.5 px-3 hover:text-black">
              Editar Tarea
            </button>
          </MenuItem>

          <MenuItem>
            <button
              type="button"
              className="w-full text-start text-red-500 rounded-lg py-1.5 px-3 hover:text-red-700">
              Eliminar Tarea
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
        </MenuItems>
      </Menu>
    </li>
  )
}

export default TaskCard