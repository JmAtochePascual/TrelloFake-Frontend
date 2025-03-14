import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useLocation, useNavigate } from "react-router-dom"
import EditTaskForm from "./EditTaskForm";

const EditTaskModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isModalActive = queryParams.get('editTask') ? true : false;

  return (
    <>
      <Dialog
        open={isModalActive}
        onClose={() => navigate(location.pathname, { replace: true })}
        className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/90">
          <DialogPanel className="w-full max-w-lg flex flex-col gap-2 rounded-md bg-white p-6">
            <DialogTitle
              as="h3"
              className="text-3xl font-black">
              Editar Tarea
            </DialogTitle>

            <Description className="text-gray-800">
              Llena el formulario y edita <span className='font-bold text-primary'>una Tarea</span>
            </Description>

            <EditTaskForm />

          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default EditTaskModal