import { TProjectTasks } from "@/types/projectType"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"
import DropTask from "../DropTask"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTaskStatus } from "@/services/taskService"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { TTask } from "@/types/taskType"

type TaskListProps = {
  tasks: TProjectTasks,
  canEdit: boolean
}

type TGroupedTasks = {
  [key: string]: TProjectTasks
}

const initialTasks: TGroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: []
}

const statusStyles: { [key: string]: string } = {
  pending: 'border-t-slate-500',
  onHold: 'border-t-red-500',
  inProgress: 'border-t-blue-500',
  underReview: 'border-t-amber-500',
  completed: 'border-t-emerald-500'
}

const TaskList = ({ tasks, canEdit }: TaskListProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialTasks);


  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      };
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      // queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      toast.success(message);
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Check if the task is dropped over a valid drop zone (not null)
    if (over && active.id) {
      const taskId = active.id.toString();
      const status = over.id as TTask['status'];

      mutate({ projectId, taskId, status });
    };
  };

  return (
    <>
      <h2 className="mb-4 text-3xl font-black text-gray-800">Tareas</h2>

      <div className='flex gap-5 overflow-x-auto pb-32 lg:overflow-x-hidden'>
        <DndContext onDragEnd={handleDragEnd}>

          {
            Object.entries(groupedTasks).map(([status, tasks]) =>
              <div
                key={status}
                className='w-full min-w-[200px] '>

                <h3 className={`p-2 capitalize text-lg font-light border border-slate-300 border-t-8 text-gray-800 bg-white ${statusStyles[status]}`}>
                  {statusTranslations[status]}
                </h3>

                <DropTask
                  status={status}
                />

                <ul className='mt-5 space-y-5'>
                  {
                    tasks.length === 0
                      ? <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                      : tasks.map(task =>
                        <TaskCard
                          key={task._id}
                          task={task}
                          canEdit={canEdit}
                        />)
                  }
                </ul>
              </div>
            )
          }
        </DndContext>
      </div>
    </>
  )
}

export default TaskList