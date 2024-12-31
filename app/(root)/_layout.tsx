// specifically for properties and tabs since these are the pages user needs
// to be authenticated for

import { useGlobalContext } from '@/lib/global-provider'
import { Redirect, Slot } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext()

  if (loading) {
    return (
      <SafeAreaView className='bg-white h-full flex justify-center items-center'>
        <ActivityIndicator className='text-primary-300' size={'large'} />
      </SafeAreaView>
    )
  }

  if (!isLoggedIn) {
    return <Redirect href='/sign-in' />
  }

  return <Slot />
  // think of Slot as current page
}
