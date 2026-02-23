import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createUser } from '../services/userService';

export default function Onboarding() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleStart = () => {
        if (name.trim()) {
            const user = createUser(name.trim());
            if (user) {
                router.replace('/');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Let's get started by knowing your name.</Text>
            <TextInput
                label="Enter your name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
            />
            <Button mode="contained" onPress={handleStart} style={styles.button}>
                Get Started
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        color: '#666',
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
});
