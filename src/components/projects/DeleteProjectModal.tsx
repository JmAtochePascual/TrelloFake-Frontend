
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";
import { checkPasswordSchema, TCheckPassword } from "@/types/authType";
import { checkPasswordToDeleteProject } from "@/services/authService";
import { deleteProject } from "@/services/projectService";

const DeleteProjectModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('deleteProject')!;
  const isDeleteModalActive = queryParams.get('deleteProject') ? true : false;
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<TCheckPassword>({
    resolver: zodResolver(checkPasswordSchema)
  })

  // Mutate to check the password to delete the project
  const mutation = useMutation({
    mutationFn: checkPasswordToDeleteProject,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  });

  // Mutate to delete the project
  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(message);
      navigate(location.pathname, { replace: true });
    }
  });

  const handleDelete = async (formData: TCheckPassword) => {
    await mutation.mutateAsync(formData);
    await deleteProjectMutation.mutateAsync(projectId);
  };

  return (
    <>
      <Dialog
        open={isDeleteModalActive}
        onClose={() => navigate(location.pathname, { replace: true })}
        className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/90">
          <DialogPanel className="w-full max-w-lg flex flex-col gap-2 rounded-md bg-white p-6">
            <DialogTitle
              as="h3"
              className="text-3xl font-black">
              Eliminar Proyecto
            </DialogTitle>

            <Description className="text-gray-800">
              Confirma la eliminación del proyecto <span className='font-bold text-primary'>colocando tu password</span>
            </Description>

            <form
              onSubmit={handleSubmit(handleDelete)}
              autoComplete="off"
              noValidate
              className="w-full flex flex-col gap-4 rounded-md">

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="font-bold text-gray-600">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full p-2 border-1 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />

                {errors.password && <ErrorMessage message={errors.password.message} />}
              </div>

              <input
                type="submit"
                value="Eliminar Proyecto"
                className="w-full p-2 font-bold bg-primary text-white cursor-pointer hover:bg-primaryHover" />
            </form>

          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default DeleteProjectModal