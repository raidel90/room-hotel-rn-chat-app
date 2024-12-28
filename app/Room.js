import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { GloboContext } from '../providers/GloboContext';
import { useEffect, useRef, useLayoutEffect, useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';

const boundedHeight = Dimensions.get('window').height;

const Room = () => {
    const { room_id, roomTitle, sender } = useLocalSearchParams();
    const {
        chatMessages,  
        joinRoom, 
        userMessage, 
        setUserMessage, 
        sendMessage, 
        handleChatMessages, 
        socket 
    } = useContext(GloboContext);

    const flatListRef = useRef();

    useLayoutEffect(() => {
        joinRoom(room_id, sender); 
        flatListRef.current.scrollToEnd({ animated: true }) 
    },[]);

    useEffect(() => {
        socket.on('newMessage', handleChatMessages);
    },[socket]);

    const sendPost = () => {
        sendMessage(userMessage, room_id, sender);
    };

    const MessageComponent = ({content, sent, user, sender}) => {
        const origin = user !== sender;
        
        return(
            <View style={origin ? styles.roomMessageContainer : styles.myMessageContainer}>
                <View style={origin ? styles.roomMessage : styles.myMessage}>
                    <Text style={origin ? styles.roomText : styles.myText}>{content}</Text>
                </View>
                <View style={styles.userRow}>
                    <Text style={styles.info}>{user}</Text>
                    <Text style={styles.info}>{sent}</Text>
                </View>    
            </View>
        );
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{roomTitle}</Text>
            <Text style={styles.user}>Chat User :{sender}</Text>
            <View style={styles.listView}>
                <FlatList
                    ref={flatListRef}            
                    data={chatMessages}
                    renderItem={({ item }) => <MessageComponent {...item} sender={sender} />}
                    keyExtractor={item => item.id}
                    inverted={true}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                />
            </View>
            <View style={styles.messaging}>
                <Text style={styles.formLabel}>ENTER A MESSAGE</Text>
                <TextInput 
                    style={styles.formInput}
                    onChangeText={setUserMessage}
                    value={userMessage}
                />
                <TouchableOpacity onPress={sendPost}>
                    <Text style={styles.formButtonLabel}>SEND</Text>
                </TouchableOpacity>    
            </View>    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: boundedHeight,
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        ...Platform.select({
            android: {
                fontSize: 24,
                paddingVertical: 5,
            },
            ios: {
                fontSize: 24,
                paddingVertical: 5
            },
            default: {
                fontSize: 30,
                paddingVertical: 10
            }
        })
    },
    user: {
        fontWeight: 'bold',
        ...Platform.select({
            android: {
                fontSize: 20,
                paddingVertical: 5
            },
            ios: {
                fontSize: 20,
                paddingVertical: 5
            },
            default: {
                fontSize: 24,
                paddingVertical: 10
            }
        })
    },
    listView: {
        height: '40%',
        paddingTop: 20,
        borderWidth: 1
    },
    messaging: {
        height: '60%'
    },
    roomMessageContainer: {
        width: '45%',
        paddingBottom: 15    
    },
    myMessageContainer: {
        width: '45%',
        alignSelf: 'flex-end',
        paddingBottom: 15    
    },
    roomMessage: {
        backgroundColor: '#1E90FF',
        borderRadius: 8
    },
    myMessage: {
        backgroundColor: '#949494',
        borderRadius: 8
    },
    roomText: {
        fontSize: 24,
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: '#ffffff'
    },
    myText: {
        fontSize: 24,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    userRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    info: {
        fontWeight: 'bold',
        ...Platform.select({
            android: {
                fontSize: 12,
                paddingTop: 10
            },
            ios: {
                fontSize: 12,
                paddingTop: 10
            },
            default: {
                fontSize: 24,
                paddingTop: 18
            }
        })
    },
    formLabel: {
        alignSelf: 'center',
        ...Platform.select({
            android: {
                fontSize: 16,
                paddingVertical: 10
            },
            ios: {
                fontSize: 16,
                paddingVertical: 10
            },
            default: {
                fontSize: 24,
                paddingVertical: 18
            }
        })
    },
    formInput: {
        width: 350,
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center',
        ...Platform.select({
            android: {
                fontSize: 16,
            },
            ios: {
                fontSize: 16,
            },
            default: {
                fontSize: 24,
                width: 400
            }
        })
    },
    formButtonLabel: {
        alignSelf: 'center',
        ...Platform.select({
            android: {
                fontSize: 22,
                paddingTop: 12
            },
            ios: {
                fontSize: 22,
                paddingTop: 12
            },
            default: {
                fontSize: 30,
                paddingTop: 20
            }
        })
    }
});

export default Room;