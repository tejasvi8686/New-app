import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'



type Props = {}

export default function NewsDetails( props: Props ) {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>NewsDetails {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})