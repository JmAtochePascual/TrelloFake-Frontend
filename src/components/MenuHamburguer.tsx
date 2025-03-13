import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/16/solid'

const MenuHamburguer = () => {
  return (
    <nav>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-secondary py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <Bars3Icon className="size-6" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 mt-2 flex flex-col origin-top-right rounded-xl borde bg-white px-2 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-2xl">

          <p className='p-2 text-center text-sm/6'>Hola Usuario</p>

          <MenuItem>
            <button className="w-full text-start rounded-lg py-1.5 px-3 hover:bg-secondary/80 hover:text-white">
              Mi Perfil
            </button>
          </MenuItem>

          <MenuItem>
            <button className="w-full text-start rounded-lg py-1.5 px-3 hover:bg-secondary/80 hover:text-white">
              Mis Proyectos
            </button>
          </MenuItem>

          <MenuItem>
            <button className="w-full text-start rounded-lg py-1.5 px-3 hover:bg-red-500/80 hover:text-white">
              Cerrar Sesion
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
        </MenuItems>
      </Menu>
    </nav>
  )
}

export default MenuHamburguer