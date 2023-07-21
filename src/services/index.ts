import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export const useFetchTop100 = ({ albumId }: { readonly albumId: string }) => {
  return useQuery({
    queryKey: ['top100'],
    queryFn: async (): Promise<any> => {
      const response = await axios.get(`https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb`)
      return response.data
    }
  })
}
