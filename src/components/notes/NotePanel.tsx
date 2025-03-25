import { NotesType } from "@/types/noteType";
import NoteForm from "../notes/NoteForm";
import NoteCard from "./NoteCard";

type NotePanelProps = {
  notes: NotesType
}

const NotePanel = ({ notes }: NotePanelProps) => {

  return (
    <>
      <NoteForm />

      <div className="mt-10 divide--y divide-gray-100">
        {
          notes.length === 0
            ? <p>No hay notas</p>
            : <>
              <p className="text-center text-gray-600">Todas las notas</p>

              {
                notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note} />
                ))
              }
            </>
        }
      </div>
    </>
  )
}

export default NotePanel