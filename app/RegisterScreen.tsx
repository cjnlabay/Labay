import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type_id, setType_id] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await fetch('https://devapi-618v.onrender.com/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, username, password, type_id }),
            });

            const data = await response.json();

            if (response.ok) {
                router.replace('/'); // Navigate to Home
            } else {
                alert(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('Register failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullname}
                    onChangeText={setFullname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type ID"
                    value={type_id}
                    onChangeText={setType_id}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register Now</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>
                    Already have an account? <Text style={styles.loginText} onPress={() => router.push('/LoginScreen')}>Login here</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F9F9F9', 
        padding: 20 
    },
    formContainer: { 
        width: '100%', 
        backgroundColor: '#F3F1EC', 
        padding: 20, 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 10, 
        elevation: 5 },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 20 },
    input: { 
        width: '100%', 
        padding: 12, 
        marginBottom: 15, 
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 8, 
        backgroundColor: '#F5F5F5' 
    },
    button: { 
        backgroundColor: '#e9e6dd', 
        width: '100%', 
        alignItems: 'center', 
        borderRadius: 8, 
        paddingVertical: 14 
    },
    buttonText: { 
        color: '#black', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    footerText: { 
        marginTop: 15, 
        fontSize: 14, 
        color: '#666', 
        textAlign: 'center' 
    },
    loginText: { 
        fontSize: 14,
        color: 'black', 
        fontWeight: 'bold' 
    },
});

export default Register;