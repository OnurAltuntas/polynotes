import React,{useState} from 'react';
import {StyleSheet, View,Button,TouchableOpacity,Image} from 'react-native';
import { SafeAreaView, FlatList, Text, StatusBar } from 'react-native';
import ActionButton from 'react-native-action-button';
import {addBoards} from '../redux/actions/index'
import {connect} from 'react-redux'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
   
  ];
  
  const Item = ({ title }) => (
    <View style={styles.item} >
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const Boards = () => {
    const [id, setId] = useState('');
    const [title, settitle] = useState('')
    
    const addBoardHandler = (params) => {
        console.log("add")
    }

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

    
    
  return (
    <View style={styles.MainContainer}>

    <SafeAreaView style={styles.container}>
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
        
       
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={addBoardHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
             source={{
uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
  );
};

export default connect(null,{addBoards})(Boards) ;

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
  
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
  
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
  });
