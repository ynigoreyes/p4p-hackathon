import React from 'react'
import { View, Button } from 'react-native'

export default function ProjectDescription({ expanded, handleExpandDesc }) {
  return (
    <View>
      <Button
        title='Show more of Project'
        onPress={handleExpandDesc}
      />
    </View>
  )
}

