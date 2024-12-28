import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Dimensions, 
    Platform
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const boundedHeight = Dimensions.get('window').height;

const Register = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const cancelRegistration = () => {
        router.replace('/');
    };

    const registerUser = () => {
        if ( !userName ){
            Alert.alert('Please enter a username');
        }
        else if ( !password ){
            Alert.alert('Please enter a password!');
        }
        else if ( !passwordConfirm ){
            Alert.alert('Please confirm your password!');
        }
        else if ( password !== passwordConfirm ){
            Alert.alert('Passwords do not match!');
        }
        else {
            AsyncStorage.getItem(userName, (err, result) => {
                if ( result !== null ){
                    Alert.alert(`${userName} already registered`);
                }
                else {
                    AsyncStorage.setItem(userName, password, () => {
                        Alert.alert(`Account created for ${userName}`);
                    });
                    router.replace('/');
                }
            });    
        }    
    };

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.formView}>
                <Text style={styles.formTitle}>REGISTER AN ACCOUNT</Text>
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
                <Text style={styles.formLabel}>Confirm Password</Text>
                <TextInput 
                    style={styles.formInput}
                    onChangeText={setPasswordConfirm}
                    value={passwordConfirm}
                    placeholder='Confirm your password'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={registerUser}>
                    <Text style={styles.formButtonLabel}>REGISTER ACCOUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelRegistration}>
                    <Text style={styles.formButtonLabel}>CANCEL</Text>
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
                paddingBottom: 360
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

export default Register;