import React from 'react'
import { Text, Platform, View, AsyncStorage } from 'react-native'
import { GiftedChat } from "react-native-gifted-chat";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import uuid from 'uuid/v4'

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/863f1f81-128b-4435-a173-c7749ff56b99/token';
const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:863f1f81-128b-4435-a173-c7749ff56b99';
const CHATKIT_ROOM_ID = '19378333'; // Test
// const CHATKIT_ROOM_ID = '19378334'; // Demo
const CHATKIT_USER_NAME = 'Miggy';

export default class MessagesScreen extends React.Component {
  state = {
    messages: [],
    loading: true,
    roomId: '',
    email: '',
  }

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    })

    AsyncStorage.getItem('email').then((email) => {
      const chatManager = new ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: 'Miggy',
        tokenProvider: tokenProvider,
      })

      chatManager.connect().then(currentUser => {
        matchedEmail = this.props.navigation.getParam('matchedEmail')
        this.currentUser = currentUser
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          },
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.setState({
            loading: false,
            email,
          })
        })
      }).catch(err => {
        console.log('error in connect')
        console.error(err);
      })
    }).catch(err => {
      console.log('error in getItem')
      console.error(err)
    })

  }

  onSend = (messages = []) => {
    messages.forEach(message => {
      this.currentUser
        .sendMessage({
          text: message.text,
          roomId: CHATKIT_ROOM_ID,
        })
        .then(() => {})
        .catch(err => {
          console.log(err);
        })
    })
  }

  onReceive = data => {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA',
      },
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.loading
          ? <Text>Loading...</Text>
          : (
            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              isAnimated={true}
              user={{
               _id: 'Miggy'
             }}
            />
          )
        }
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    )
  }
}
