import useAuth from "@/hooks/useAuth";
import { deleteNote } from "@/services/noteService";
import { NoteType } from "@/types/noteType"
import { formatDate } from "@/utils/formatDate"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface NoteCardProps {
  note: NoteType
}

const NoteCard = ({ note }: NoteCardProps) => {
  // Project id
  const params = useParams();
  const projectId = params.projectId!;

  // Task id
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskDetails')!;

  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => note.createBy._id === data?._id, [note, data]);
  const queryClient = useQueryClient();

  // Mutate to delete a note
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
    onSuccess: (message) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
  });

  if (isLoading) return <p>Cargando...</p>;
  return (
    <div className="flex items-center justify-between mb-2">
      <div>
        <p>{note.content} Por <span className="font-bold text-slate-600">{note.createBy.name}</span></p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      {
        canDelete && (
          <button
            onClick={() => mutate({ projectId, taskId, noteId: note._id })}
            className="text-red-500 hover:text-red-700">
            Eliminar
          </button>
        )
      }
    </div>
  )
}

export default NoteCard