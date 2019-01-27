import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import mylayout from '../constants/Layout.js'

const NUM_OF_IMAGES = 4

export default function Preview({ imgURL }) {
  const { width } = mylayout.window

  return (
    <View
      style={{ width }}
    >
      <Image
        style={{
          width,
          height: 420,
          resizeMode: 'contain',
          backgroundColor: 'black'
        }}
        source={require('../assets/images/square_1.png')}
      />
    </View>
  )
}
