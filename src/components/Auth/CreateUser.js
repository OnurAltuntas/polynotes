import React,{useState} from 'react';
import {StyleSheet, Text, View,CheckBox,ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input,Button} from 'native-base';
import firebase from 'firebase';

const CreateUser = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);


  const submitHandler = () => {
      firebase.auth().createUserWithEmailAndPassword(username.trim(),password.trim()).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        // ...
      })
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
    <Container>
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
            rounded block warning style={{margin:20,}}
            title="singin"
            onPress={submitHandler}
            
            >
            <Text style={{fontSize:20}}>Sign up</Text>
          </Button>

          <Text style={{textAlign:"center",fontSize:16}}
          onPress={()=>{
            navigation.navigate('Signin')
          }}
          >Do you have already an account?</Text>
            
          </Form>
        </Content>
      </Container>
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
