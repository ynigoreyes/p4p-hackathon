import React from 'react'
import { View, Button, Text } from 'react-native'

export default function ProjectDescription({ info, expanded, handleExpandDesc }) {
  return (
    <View>
      {
        expanded
          ? (
            <View>
              <Text>
                Name: {info.name}
              </Text>
              <Text>
                Owner {info.owner}
              </Text>
              <Text>
                Description {info.description}
              </Text>
            </View>
          ) : null
      }
      <Button
        title={`Show ${expanded ? 'less' : 'more'} of Project`}
        onPress={handleExpandDesc}
      />
    </View>
  )
}

