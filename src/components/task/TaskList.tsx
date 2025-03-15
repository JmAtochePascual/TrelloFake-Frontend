import { TProjectTasks } from "@/types/projectType"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"

type TaskListProps = {
  tasks: TProjectTasks
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

const TaskList = ({ tasks }: TaskListProps) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialTasks);

  return (
    <>
      <h2 className="mb-4 text-3xl font-black text-gray-800">Tareas</h2>

      <div className='flex gap-5 overflow-x-auto pb-32'>
        {
          Object.entries(groupedTasks).map(([status, tasks]) =>
            <div
              key={status}
              className='w-full min-w-[200px] '>

              <h3 className={`p-2 capitalize text-lg font-light border border-slate-300 border-t-8 text-gray-800 bg-white ${statusStyles[status]}`}>
                {statusTranslations[status]}
              </h3>

              <ul className='mt-5 space-y-5'>
                {
                  tasks.length === 0
                    ? <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                    : tasks.map(task => <TaskCard
                      key={task._id}
                      task={task}
                    />)
                }
              </ul>
            </div>
          )
        }
      </div>

    </>
  )
}

export default TaskList