import { account } from '../appwrite'

export async function logout() {
  try {
    await account.deleteSession('current')
  } catch (error) {
    console.error(error)
    return false
  }
}
