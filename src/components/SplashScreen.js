import React, { Component,useEffect} from 'react'
import { Text, View ,ImageBackground,StyleSheet,Image} from 'react-native'
import bg from '../assests/sea.jpg';
import logo from '../assests/logo.png'
import firebase from 'firebase';
import { CommonActions } from '@react-navigation/native';


const SplashScreen=({navigation})=>{

  
        return (
            <ImageBackground source={bg} style={styles.backgroundImage}>
            <View style={styles.container}>
              <Image source={logo} style={styles.imgicon} />  
              <Text style={styles.text}>Polynotes</Text>
            </View>
            </ImageBackground>
        )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgicon: {
     width:100,
     height:100,
     textAlign:"center",
     justifyContent:"center",
     alignItems:"center"
    },
    text:{
     fontFamily:"Lobster-Regular",
     fontSize:50,
     color:"#FFB500"
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  });

export default SplashScreen;
