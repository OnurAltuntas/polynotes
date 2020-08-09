import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View ,ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input,Button} from 'native-base';
import firebase from 'firebase';

const Signin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.navigate('Boards');

    }
 });
    
  }, [])


  const submitHandler = () => {
      console.log(username,password);
      firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        // ...
      });
    }

  const onLoginSuccess = () =>{
      navigation.navigate('Boards')
      
     
      setError('');
      setLoading(false);
  }
  

  return (
    <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username"
              value={username}
              onChangeText={(value) => setUsername(value)}
              />
            </Item>
            <Item last>
              <Input placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
              />
              
            </Item>
            <Button 
            rounded block success style={{margin:20,}}
            title="singin"
            onPress={submitHandler}
            
            >
            <Text>SignIn</Text>
          </Button>
            
          </Form>
        </Content>
      </Container>
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
