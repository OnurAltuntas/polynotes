import React,{useState} from 'react';
import {StyleSheet, Text, View,Button,CheckBox} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';

const CreateUser = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);


  const submitHandler = () => {
      firebase.auth().createUserWithEmailAndPassword(username,password)
      .then(onLoginSuccess)
  }

  const onLoginSuccess = () =>{
      navigation.navigate('Home')
      setError('');
      setLoading(false);
  }

  const rememberHandler = (value) =>{
    if(value){
      //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }
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
        title="CreateUser"
        onPress={submitHandler}
       
      />

      <CheckBox
      value={isSelected}
      onValueChange={(value)=>{rememberHandler(value)}}
      style={styles.checkbox}
    />
   
    </View>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  View: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
