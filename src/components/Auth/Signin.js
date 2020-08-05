import React,{useState} from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';

const Signin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const submitHandler = () => {
      console.log(username,password);
      firebase.auth().signInWithEmailAndPassword(username,password)
      .then(onLoginSuccess)
  }

  const onLoginSuccess = () =>{
      navigation.navigate('Home')
      setError('');
      setLoading(false);
  }
  

  return (
    <View style={styles.View}>
        <TextInput
        placeholder="email"
        value={username}
        onChangeText={(value) => setUsername(value)}
        ></TextInput>
        <TextInput
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        ></TextInput>
        <Button
        title="Login"
        onPress={submitHandler}
       
      />

      <Text>Create User</Text>
      <Button
      title="CreateUser"
      onPress={()=> { navigation.navigate('CreateUser')}}
     
    />
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  View: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
