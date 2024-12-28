import { View, Image, StyleSheet } from 'react-native';
import { GloboContext } from '../providers/GloboContext';
import { useEffect, useContext } from 'react';

const Home = () => {
    const banner = require('../assets/mobileBanner.png');
    const {isConnected, chatDisconnect} = useContext(GloboContext);

    useEffect(() => {
        if (isConnected) {
            chatDisconnect();
        }
    },[]);

    return(
        <View>
            <Image
                source={banner}
                style={styles.banner}
            />
        </View>
    );    
};

const styles = StyleSheet.create({
    banner:{
        width: '100%',
        height: 300,
        resizeMode: 'stretch'
    }
});

export default Home;