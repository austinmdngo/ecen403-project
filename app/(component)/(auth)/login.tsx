import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../api/firebase';

const auth = getAuth(app);

export default function LoginScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async() => {
        try {
            const res = await signInWithEmailAndPassword(auth, userName, password);
            console.log(res);
        } catch(er) {
            console.warn(er);
        }
    }

    const handleIsSignup = async() => {
        try {
            const res = await createUserWithEmailAndPassword(auth, userName, password);
            console.log(res);
        } catch(er) {
            console.warn(er);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formInputWrapper}>
                <Octicons name="person" size={20} color="#0005" />
                <TextInput 
                    cursorColor={"#000"}
                    style={styles.input}
                    value={userName}
                    onChangeText={username => setUserName(username)}
                    placeholder='User Name' />
            </View>
            <View style={styles.formInputWrapper}>
                <Octicons name="shield-lock" size={20} color="#0005" />
                <TextInput 
                    cursorColor={"#000"}
                    style={styles.input}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                    placeholder='Password' />
            </View>

            <Ripple 
                style={{ marginTop : 20, backgroundColor : '#4CAF50', padding : 10, borderRadius : 5 }}
                // onPress={() => {
                //     // setIsLoading(true);
                //     // // Simulate a login process
                //     // setTimeout(() => {
                //     //     setIsLoading(false);
                //     //     alert('Login Successful!');
                //     // }, 2000);
                //     navigation.navigate('(tabs)' as unknown as never); // temporary navigation to the tabs screen
                // }}>
                onPress={handleLogin}>
                <Text style={{ color : '#fff', fontSize : 16 }}>{isLoading ? 'Loading...' : 'Login'}</Text>
            </Ripple>
            <Ripple 
                style={{ marginTop : 20, backgroundColor : '#4CAF50', padding : 10, borderRadius : 5 }}
                // onPress={() => {
                //     // setIsLoading(true);
                //     // // Simulate a login process
                //     // setTimeout(() => {
                //     //     setIsLoading(false);
                //     //     alert('Login Successful!');
                //     // }, 2000);
                //     navigation.navigate('(tabs)' as unknown as never); // temporary navigation to the tabs screen
                // }}>
                onPress={handleIsSignup}>
                <Text style={{ color : '#fff', fontSize : 16 }}>{isLoading ? 'Loading...' : 'Sign Up'}</Text>
            </Ripple>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    formInputWrapper : {
        width : '90%',
        height : 55,
        backgroundColor : '#f7f9ef',
        borderWidth : 1,
        borderColor : '#0005',
        borderRadius : 6,
        flexDirection : 'row',
        alignItems : 'center',
        paddingLeft : 8
    },
    input : {
        width : '90%',
        height : '100%',
        marginLeft : 8,
    }
});