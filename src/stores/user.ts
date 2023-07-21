import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface UserType {
  name: string | null
  image: string | null
  expiredIn: number | null
  refreshToken: string | null
  accessToken: string | null
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserType>({
    name: null,
    image: null,
    expiredIn: null,
    accessToken: null,
    refreshToken: null
  })

  function updateUser(updatedUser: UserType) {
    user.value = { ...user.value, ...updatedUser }
  }

  return { user, updateUser }
})
