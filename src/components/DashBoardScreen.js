import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import bg from '../assests/sea.jpg';
import img1 from '../assests/polynotes-cards2.png';
import img2 from '../assests/polynotes-cards.png';
import img3 from '../assests/desktopImg.png';

export class DashBoardScreen extends Component {
  render() {
    return (
      <ImageBackground source={bg} style={styles.backgroundImage}>
        <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView>
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 24,
                color: '#fff',
              }}>
              Polynotes, daha fazla işbirliği içerisinde çalışmanıza ve daha
              fazla iş yapmanıza izin verir.

              </Text>

              <Image
                style={{
                marginLeft:5,
                marginTop: 20,
                width: 400,
                height: 300,
                borderRadius: 10,
                }}
                source={img2}
              />

              <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 24,
                color: '#fff',
              }}>
              
              
              Polynotes, çoklu platformlarda
              çalışmanıza izin verir. Masaüstü, mobil ve web sürümleri sayesinde
              her yerden kolaylıkla erişebilirsiniz.
              </Text>
             
              <Image
                style={{
                  marginTop: 20,
                  width: 400,
                  height: 300,
                  borderRadius: 10,
                }}
                source={img3}
              />

            
           
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // or 'stretch'
  },
});

export default DashBoardScreen;
