import { deleteTask } from "@/services/taskService"
import { TProjectTask } from "@/types/projectType"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDraggable } from "@dnd-kit/core"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type TaskCardProps = {
  task: TProjectTask,
  canEdit: boolean
}

const TaskCard = ({ task, canEdit }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task._id });
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  // Mutate to delete a task  
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Tarea eliminada');
    }
  });

  const onDelete = () => mutate({ projectId, taskId: task._id });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <li className="p-4 flex justify-between items-start gap-3 border border-slate-200 bg-white">

      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="w-full flex flex-col gap-1">
        <button
          type="button"
          onClick={() => navigate('?taskDetails=' + task._id)}
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
            <button
              onClick={() => navigate('?taskDetails=' + task._id)}
              className="w-full text-start text-gray-700 rounded-lg py-1.5 px-3 hover:text-black">
              Ver Tarea
            </button>
          </MenuItem>

          {
            canEdit &&
            <>
              <MenuItem>
                <button
                  onClick={() => navigate('?editTask=' + task._id)}
                  className="w-full text-start text-gray-700 rounded-lg py-1.5 px-3 hover:text-black">
                  Editar Tarea
                </button>
              </MenuItem>

              <MenuItem>
                <button
                  onClick={onDelete}
                  type="button"
                  className="w-full text-start text-red-500 rounded-lg py-1.5 px-3 hover:text-red-700">
                  Eliminar Tarea
                </button>
              </MenuItem>
            </>
          }

          <div className="my-1 h-px bg-white/5" />
        </MenuItems>
      </Menu>
    </li>
  )
}

export default TaskCard