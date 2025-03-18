import { getProfile } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ['profile'],
    retry: false,
    refetchOnWindowFocus: false
  })

  return {
    data,
    isError,
    isLoading
  }
}

export default useAuth; 