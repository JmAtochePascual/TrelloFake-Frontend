import { statusTranslations } from "@/locales/es";
import { getTask, updateTaskStatus } from "@/services/taskService";
import { formatDate } from "@/utils/formatDate";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import { TTask } from "@/types/taskType";
import NotePanel from "../notes/NotePanel";

const TaskModalDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const queryClient = useQueryClient();

  const projectId = params.projectId!;
  const queryParams = new URLSearchParams(location.search);
  const isModalActive = queryParams.get('taskDetails') ? true : false;
  const taskId = queryParams.get('taskDetails')!;

  // Query to get task by id
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getTask({ projectId, taskId }),
    queryKey: ['task', taskId],
    retry: false,
    enabled: !!taskId
  });

  // Mutation to update task status
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      };
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      // navigate(location.pathname, { replace: true });
      toast.success(message);
    },
  });

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as TTask['status'];
    mutate({ projectId, taskId, status });
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) {
    toast.error(error.message, { toastId: 'getTaskError' });
    return <Navigate to={`/projects/${projectId}`} />
  };

  if (data) return (
    <>
      <Dialog
        open={isModalActive}
        onClose={() => navigate(location.pathname, { replace: true })}
        className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/90">
          <DialogPanel className="w-full max-w-lg flex flex-col gap-2 rounded-md bg-white p-6">

            <p className='flex flex-col gap-1 text-sm font-semibold text-slate-600 md:flex-row'>
              Agregada el: <span className="font-light">{formatDate(data.createdAt)}</span>
            </p>

            <p className='flex flex-col gap-1 text-sm font-semibold text-slate-600 md:flex-row'>
              Última actualización: <span className="font-light">{formatDate(data.updatedAt)}</span>
            </p>

            {
              data.completedBy.length === 0
                ? null
                : <>
                  <p className="mb-2 text-lg font-bold text-slate-600">
                    Historiasl de Cambios:
                  </p>

                  {
                    data.completedBy.map((completedBy) =>
                      <p
                        key={completedBy._id}
                        className='flex flex-col gap-1 text-sm font-semibold text-slate-600 md:flex-row'>
                        {statusTranslations[completedBy.status]} por: <span className="font-light">{completedBy.user.name}</span>
                      </p>
                    )
                  }
                </>
            }

            <DialogTitle
              as="h3"
              className="text-3xl font-black te text-gray-700">
              Detalles de la Tarea
            </DialogTitle>

            <Description className="text-lg font-bold text-slate-600 mb-2">
              Descripción: <span className="font-light">{data.description}</span>
            </Description>

            <div
              className='my-5 space-y-3'>
              <label
                htmlFor="status"
                className='font-bold text-slate-700'>
                Estado Actual:
              </label>

              <select
                onChange={handleChangeStatus}
                name="status"
                id="status"
                defaultValue={data.status}
                className='w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-primary border-slate-300'>
                {
                  Object.entries(statusTranslations).map(([key, value]) =>
                    <option
                      key={key}
                      value={key}>
                      {value}
                    </option>
                  )
                }
              </select>
            </div>

            <NotePanel
              notes={data.notes}
            />

          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default TaskModalDetails