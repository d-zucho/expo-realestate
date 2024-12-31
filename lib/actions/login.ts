import * as Linking from 'expo-linking'

import { OAuthProvider } from 'react-native-appwrite'
import { openAuthSessionAsync } from 'expo-web-browser'
import { account } from '../appwrite'
export async function login() {
  try {
    // generate redirect UI to handle oAuth response
    const redirectUri = Linking.createURL('/')
    // request oAuth token
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    )

    // if response is empty, throw an error
    if (!response) {
      throw new Error('Failed to login')
    }
    // open browser to authenticate
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    )

    if (browserResult.type !== 'success') {
      throw new Error('Failed to login. browserResult.type is not success')
    }

    // parse new url to extract returned parameters
    const url = new URL(browserResult.url)
    const secret = url.searchParams.get('secret')?.toString()
    const userId = url.searchParams.get('userId')?.toString()

    if (!secret || !userId) {
      throw new Error('Failed to login. secret or userId is empty')
    }
    // if that passed,
    // create a new session for the user
    const session = await account.createSession(userId, secret)
    if (!session) {
      throw new Error('Failed to create new session')
    }
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
