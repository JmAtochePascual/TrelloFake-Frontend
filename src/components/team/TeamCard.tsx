import { removeMemberFromTeam } from '@/services/teamService'
import { TTeamMember } from '@/types/teamType'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type TeamCardProps = {
  member: TTeamMember
}

const TeamCard = ({ member }: TeamCardProps) => {
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  // Mutate to remove a member from the team
  const { mutate } = useMutation({
    mutationFn: removeMemberFromTeam,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['members', projectId] });
    }
  });

  return (
    <li className="flex justify-between items-start px-4 py-8">
      <div>
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-gray-600">
            {member.name}
          </p>

          <p className="text-sm text-gray-600">
            {member.email}
          </p>
        </div>
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
          className="w-52 mt-2 flex flex-col origin-top-right rounded-xl border bg-white px-2 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-2xl">
          <MenuItem>
            <button
              type="button"
              onClick={() => mutate({ projectId, memberId: member._id })}
              className="w-full text-start text-red-500 rounded-lg py-1.5 px-3 hover:text-red-700">
              Eliminar del proyecto
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </li>
  )
}

export default TeamCard