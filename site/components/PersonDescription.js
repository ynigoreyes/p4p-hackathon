import React from 'react'
import { View, Button } from 'react-native'

export default function PersonDescription({ expanded, handleExpandDesc }) {
  return (
    <View>
      <Button
        title='Show more or Person'
        onPress={handleExpandDesc}
      />
    </View>
  )
}

