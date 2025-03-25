import { NoteType } from "@/types/noteType"
import { formatDate } from "@/utils/formatDate"

interface NoteCardProps {
  note: NoteType
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <div className="mb-2">
      <p>{note.content} Por <span className="font-bold text-slate-600">{note.createBy.name}</span></p>
      <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
    </div>
  )
}

export default NoteCard