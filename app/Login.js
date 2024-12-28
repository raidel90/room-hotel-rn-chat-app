import {
    StyleSheet,
    Text,
    View,
    ScrollView, 
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
    Dimensions
} from 'react-native';
import { GloboContext } from '../providers/GloboContext';
import { useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const boundedHeight = Dimensions.get('window').height;

const Login = () => {
    const {setIsLoggedIn} = useContext(GloboContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const cancelLogin = () => {
        router.replace('/');
    };

    const createAccount = () => {
        router.push('/Register');
    };

    const loginUser = () => {
        if ( !userName ) {
            Alert.alert('Please enter your username');
        }
        else if ( !password) {
            Alert.alert('Please enter a password');
        }
        else {
            AsyncStorage.getItem('userLoggedIn', (err, result) => {
                if (result !== 'none') {
                    Alert.alert('Someone already logged in');
                    router.replace('/');
                }
                else {
                    AsyncStorage.getItem(userName, (err, result) => {
                        if(result !== null) {
                            if(result !== password) {
                                Alert.alert('Password Incorrect');
                            }
                            else {
                                AsyncStorage.setItem('userLoggedIn', userName, () => {
                                    setIsLoggedIn(true);
                                    router.push('/');
                                });
                            }
                        }
                        else {
                            Alert.alert(`No account for ${userName}`);
                        }
                    });
                }
            });
        }    
    };

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.formView}>
                <Text style={styles.formTitle}>LOGIN TO CHAT</Text>
                <Text style={styles.formLabel}>Username</Text>
                <TextInput 
                    style={styles.formInput}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder='Enter Username'
                />
                <Text style={styles.formLabel}>Password</Text>
                <TextInput 
                    style={styles.formInput}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Enter Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={loginUser}>
                    <Text style={styles.formButtonLabel}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelLogin}>
                    <Text style={styles.formButtonLabel}>CANCEL LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={createAccount}>
                    <Text style={styles.formButtonLabel}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: boundedHeight,
        ...Platform.select({
            android: { 
                paddingBottom: 160
            },
            ios: { 
                paddingBottom: 160
            },
            default:{
                paddingBottom: 20
            }
        }),
    },
    formView: {
        alignItems: 'center'
    },
    formTitle: {
        ...Platform.select({
            android: {
                fontSize: 20,
                paddingVertical: 10 
            },
            ios: {
                fontSize: 20,
                paddingVertical: 10 
            },
            default: {
                fontSize: 30,
                paddingVertical: 20 
            }
        })
    },
    formLabel: {
        ...Platform.select({
            android: {
                fontSize: 16,
                paddingTop: 10
            },
            ios: {
                fontSize: 16,
                paddingTop: 10
            },
            default: {
                fontSize: 24,
                paddingTop: 18
            }
        })
    },
    formInput: {
        width: 250,
        borderWidth: 1,
        padding: 10,
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
        ...Platform.select({
            android: {
                fontSize: 16,
                paddingTop: 12
            },
            ios: {
                fontSize: 16,
                paddingTop: 12
            },
            default: {
                fontSize: 24,
                paddingTop: 20
            }
        })
    }
});

export default Login;