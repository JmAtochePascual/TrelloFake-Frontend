import ProfileForm from "@/components/profile/ProfileForm"
import useAuth from "@/hooks/useAuth"

const ProfilePage = () => {
  const { data, isLoading } = useAuth();

  if (isLoading) return <p>Cargando...</p>
  if (data) return (
    <div className="w-full max-w-[500px] mx-auto">
      <h1 className="text-5xl font-black">Mi Perfil</h1>
      <p className="mb-8 text-2xl font-light text-gray-500">Aquí puedes actualizar tu información</p>

      <ProfileForm data={data} />
    </div>
  )
}

export default ProfilePage