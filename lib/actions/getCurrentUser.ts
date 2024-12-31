import { account, avatar } from '../appwrite'

export async function getCurrentUser() {
  try {
    const response = await account.get()

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name)
      return {
        ...response,
        avatar: userAvatar.toString(),
      }
    }
  } catch (error) {
    console.error(error)
  }
}
