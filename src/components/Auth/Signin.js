import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View ,ToastAndroid,Image, ImageBackground} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input,Button} from 'native-base';
import firebase from 'firebase';
import bg from "../../../src/assests/sea.jpg"

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
      firebase.auth().signInWithEmailAndPassword(username.trim(),password.trim()).catch(function(error) {
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
    <ImageBackground source={bg} style={styles.backgroundImage} >
    <Container   >
    <Content   >
      <Form  >
        <Item   >
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
        rounded warning block  style={{margin:20,}}
        title="singin"
        onPress={submitHandler}
        
        >
        <Text style={{fontSize:20}}>Sign in</Text>
      </Button>

      <Text style={{textAlign:"center",fontSize:16}}
      onPress={()=>{
        navigation.navigate('CreateUser')
      }}
      >Dont you have an account?</Text>
        
      </Form>
    </Content>
  
   
  </Container>
    
    </ImageBackground>
   
  );
};

export default Signin;

const styles = StyleSheet.create({
  center: {
    marginTop:100,
    justifyContent: 'center',
    alignItems: 'center',
   
  },

  form:{
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center"
  },
  imgicon: {
    height:300,
    width:300,
    
    position: 'absolute',
    bottom: 0,
    right:50,
    
   },
   backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
}
});


