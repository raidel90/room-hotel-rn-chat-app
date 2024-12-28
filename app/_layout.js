import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GloboProvider } from '../providers/GloboContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return(
        <GloboProvider>
            <SafeAreaView>
                <Header />
                <Slot />
                <Footer />    
            </SafeAreaView>
        </GloboProvider>
    );    
};

export default Layout;