import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
  status: string
}

const DropTask = ({ status }: DropTaskProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status
  });

  return (
    <div
      ref={setNodeRef}
      className="mt-5 p-2 grid place-content-center text-sm font-semibold uppercase border border-dashed border-slate-500 text-slate-500">
      Soltar Tarea aquí
    </div>
  )
}

export default DropTask