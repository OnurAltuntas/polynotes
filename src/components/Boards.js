import React,{useState,useEffect, Component}from 'react'
import { StyleSheet, Text, View,FlatList ,Button,Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,BackHandler} from 'react-native'
  
import {getBoards} from '../redux/actions/index';
import {deleteBoards} from '../redux/actions/index';
import {editBoards} from '../redux/actions/index';
import {addBoards} from '../redux/actions/index';
import styles from '../components/style/styles';

import {connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';
import { StackActions, NavigationActions } from '@react-navigation/native';





class Boards  extends Component {
 
  componentDidMount(){
    var temp = 'gelir inş';
    this.props.getBoards(temp);


  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => true)
 } 


  state = {
    empty: '',
    Visible: false,
    modalVisible:false,
    itemKey: '',
    title:'',

    addState: {
      empty: '',
      modalVisible: false,
    },
  };



  editHandler = (_itemKey) => {
    this.setState({Visible: true});
    this.setState({itemKey: _itemKey});
    console.log('$$$$$$$$$$$$$$$$' + _itemKey);

    //this.props.navigation.navigate('EditScreen');
  };
  addHandler = () => {
    this.setState({modalVisible: true});
    this.setState({modalVisible: true});
    
  };

  addModalHandler = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="enter here"
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              value={this.state.title}></TextInput>

            <Button
              title="Add"
              onPress={() => {
                this.props.addBoards(
                  this.state.title,
               
                );
                this.setState({title: ''});
                this.setState({modalVisible: false});
              }}></Button>
              <Button
              title="Close"
              onPress={() => {
                this.setState({modalVisible: false});
              }}></Button>
          </View>
        </View>
      </Modal>
    )
  };

  editModalHandler = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.Visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="enter here"
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              value={this.state.title}></TextInput>

            <Button
              title="Edit this Todo"
              onPress={() => {
                this.props.editBoards(
                  this.state.title,
                  this.state.itemKey,
                );
                this.setState({title: ''});
                this.setState({Visible: false});
              }}></Button>

              <Button
              title="Close"
              onPress={() => {
                this.setState({Visible: false});
              }}></Button>
          </View>
        </View>
      </Modal>
    );
  };

  signOutHandler = ({ navigation }) =>{
    firebase.auth().signOut().then(function() {
      navigation.navigate('Home')
    }).catch(function(error) {
      // An error happened.
    });
  }

  

  drawHandler = ({navigation, route}) => {
    return(
      <FlatList style={{width:'100%'}}
      data = {this.props.boardsList}
      keyExtractor={(item) => item.key}
      renderItem={({item})=>{
        var temp = item;
        var tempKey = JSON.stringify(item.key).split('undefined').toString().replace(/['"]+/g, '').replace(',','');
      
        return(
          
         <View style={{flex: 1}}>
          <TouchableOpacity  style={styles.card}
          onPress={() => this.props.navigation.navigate('TodosScreen',{
            boardId:temp.title,
            boardKey:tempKey
          })}
          >
         
          <Text style={styles.text}
          
          >{item.title}</Text> 
          <Text style={styles.text} onPress={() => this.editHandler(item.key)}>Edit</Text>
                <Text style={styles.text}
                  onPress={() => this.props.deleteBoards(item.key)} //
                >
                  Delete
                </Text>
        </TouchableOpacity>
       
      </View>
        )
      }}
  />

    )
  }
  

  onPressHandler = ({ navigation }) => {
    return (
      <View style={styles.centeredView}>
      <this.drawHandler />
      <TouchableOpacity activeOpacity={0.7} onPress={this.addHandler}>
        <Image
          //We are making FAB using TouchableOpacity with an image
          //We are using online image here
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
          }}
          //You can use you project image Example below
          //source={require('./images/float-add-icon.png')}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>

      <this.addModalHandler />
      <this.editModalHandler />
    </View>
    );
  };

render(){
  console.log('//////////////////////',this.props.boardsList);
  return (
    
    <View style={styles.centeredView}>
    <this.drawHandler />
    <TouchableOpacity activeOpacity={0.7} onPress={this.addHandler}>
      <Image
        //We are making FAB using TouchableOpacity with an image
        //We are using online image here
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
        }}
        //You can use you project image Example below
        //source={require('./images/float-add-icon.png')}
        style={styles.FloatingButtonStyle}
      />
    </TouchableOpacity>

    <this.addModalHandler />
    <this.editModalHandler />
  </View>
  );
}
}



function mapStateToProps(state) {

  const boardsList = _.map(state.boardsList.boardsList, (val,key) => {
    return{
      ...val,
      key:key
    }
  })
  return{
    boardsList
}
}

export default connect(mapStateToProps,{getBoards,addBoards,deleteBoards,editBoards})(Boards);