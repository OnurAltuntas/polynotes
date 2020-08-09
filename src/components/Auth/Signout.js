import React, { useEffect } from 'react'
import { StyleSheet, Text, View ,ToastAndroid } from 'react-native'
import firebase from 'firebase';


const Signout = ({ navigation }) => {

    useEffect(() => {
        firebase.auth().signOut().then(function() {
            navigation.navigate('Signin');
            ToastAndroid.show("Singout is successfull!", ToastAndroid.SHORT);
          }).catch(function(error) {
            ToastAndroid.show("An error is occured!", ToastAndroid.SHORT);
          });
       
    }, [])

   
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Signout

const styles = StyleSheet.create({})
