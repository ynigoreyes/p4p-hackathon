import React from 'react'
import { View, Button } from 'react-native'

export default function ButtonSelect({ onLike, onDislike }) {
  return (
    <View>
      <Button
        title='Like'
        onPress={onLike}
        color='#008b8b'
      />
      <Button
        title='Dislike'
        onPress={onDislike}
        color='#008b8b'
      />
    </View>
  )
}
