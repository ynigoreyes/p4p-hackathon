// GiftedChatWithChatkit/MyChat.js
    const React = require("react");
    const GiftedChat =  require("react-native-gifted-chat");
    const { ChatManager, TokenProvider } = require('@pusher/chatkit-client');

    //hardcoded from API account
    const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/863f1f81-128b-4435-a173-c7749ff56b99/token';
    //hardcoded
    const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:863f1f81-128b-4435-a173-c7749ff56b99';
    // const CHATKIT_ROOM_ID = '19378301';        //create a room, get its id
    // const CHATKIT_USER_ID = 'Ulises';        //pass in user1 from the match

    //the id is the user's email
    module.exports = function(CHATKIT_USER_ID, name){
      class MyChat extends React.Component{
        constructor(){
          this.state = {
            messages: []
          };
        }
        componentDidMount() {

          //once component has mounted, create the chat room.
      const tokenProvider = new TokenProvider({
        url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
      });

      //create the user to allow authentication, if not already created
      chatkit.createUser({
        id: CHATKIT_USER_ID,
        name: name,
      })
        .then(() => {
          console.log('User created successfully');
        }).catch((err) => {
          console.log(err);
        });
      const chatManager = new ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: CHATKIT_USER_ID,
        tokenProvider: tokenProvider,
      });

      chatManager
        .connect()
        .then(currentUser => {
          this.currentUser = currentUser;
          this.currentUser.subscribeToRoom({
            roomId: CHATKIT_ROOM_ID,
            hooks: {
              onMessage: this.onReceive,
            },
          });
        })
        .catch(err => {
          console.log(err);
        });
      }
      onReceive(data) {
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
        }
      };

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, incomingMessage),
      }));
    };
        onSend(messages = []){
          messages.forEach(message => {
            this.currentUser
              .sendMessage({
                text: message.text,
                roomId: CHATKIT_ROOM_ID,
              })
              .then(() => {})
              .catch(err => {
                console.log(err);
              });
          });
        };
        render() {
            return (
              <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                 _id: CHATKIT_USER_ID
               }}
              />
            );
          };
    }
}
