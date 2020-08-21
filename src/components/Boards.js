import React,{useState,useEffect, Component}from 'react'
import { StyleSheet, View,FlatList,Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,BackHandler,ImageBackground, ToastAndroid} from 'react-native'
import { Container, Header, Content, Button, Icon, Text,Fab } from 'native-base';
import {getBoards} from '../redux/actions/index';
import {deleteBoards} from '../redux/actions/index';
import {editBoards} from '../redux/actions/index';
import {addBoards} from '../redux/actions/index';
import styles from '../components/style/styles';

import {connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';
import { StackActions, NavigationActions } from '@react-navigation/native';
import bg from "../assests/sea.jpg"
import road from "../assests/road.jpg"







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
    active:'false',

    addState: {
      empty: '',
      modalVisible: false,
    },
  };



  editHandler = (_itemKey) => {
    this.setState({Visible: true});
    this.setState({itemKey: _itemKey});

    //this.props.navigation.navigate('EditScreen');
  };
  addHandler = () => {
    this.setState({modalVisible: true});
    this.setState({modalVisible: true});
    
  };

  addModalHandler = () => {
    return (
      <Modal
      
        animationType="fade"
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

            <Button style={styles.addButton}
              title="Add"
              onPress={() => {
                if(this.state.title===""){
                  ToastAndroid.show("Empty task cannot be entered!", ToastAndroid.SHORT);
                }
                else{
                  this.props.addBoards(
                    this.state.title,
                  );
                }
               
                this.setState({title: ''});
                this.setState({modalVisible: false});
              }}>
              <Text>Add</Text>
              </Button>
              <Button style={styles.closeButton} iconLeft light
            
              title="Close"
              onPress={() => {
                this.setState({modalVisible: false});
              }}>
             
              <Text style={{fontSize:18}}>X</Text>
              </Button>
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

            <Button style={styles.addButton}
              title="Edit this Todo"
              onPress={() => {
                this.props.editBoards(
                  this.state.title,
                  this.state.itemKey,
                );
                this.setState({title: ''});
                this.setState({Visible: false});
              }}>
              <Text>Edit</Text>
              </Button>

              <Button style={styles.closeButton} iconLeft light
            
              title="Close"
              onPress={() => {
                this.setState({Visible: false});
              }}>
             
              <Text>X</Text>
              </Button>

              
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
         <ImageBackground source={road}  style={styles.image}
         imageStyle={{ borderRadius: 25,borderColor:"#fff",borderWidth:1 }}>
       
          <TouchableOpacity  style={styles.card}
          onPress={() => this.props.navigation.navigate('TodosScreen',{
            boardId:temp.title,
            boardKey:tempKey
          })}
          >
         
          <Text style={{fontSize:20 ,marginTop:20, marginBottom:20,backgroundColor:"#DCEEF2",minWidth:200,textAlign:"center",borderRadius:10,opacity: 0.9,paddingRight:10,paddingLeft:10}}
          
          >{item.title}</Text> 
          
         <View  style={{flex: 1, flexDirection: 'row'}}>
         <Text style={styles.text} onPress={() => this.editHandler(item.key)}>✎</Text>
         <Text style={styles.text }  onPress={() => this.props.deleteBoards(item.key)}>🗑</Text>
         </View>

        
                
             
                
              
        </TouchableOpacity>
      
        </ImageBackground>
      </View>
        )
      }}
  />

    )
  }
  

 

render(){
  return (
    <ImageBackground source={bg} style={styles.backgroundImage} >
    <View style={styles.centeredView}>
    <this.drawHandler />
    <Fab icon="add"
      active={false}
      direction="right"
      containerStyle={{ marginLeft: 10 }}
      style={{ backgroundColor: '#FFA445' }}
      position="bottomRight"
      onPress={() => this.addHandler()}
      
  >
    <Icon name="add" />
      <Button style={{ backgroundColor: '#34A34F' }}>
          <Icon name="logo-whatsapp" />
      </Button>
      <Button style={{ backgroundColor: '#3B5998' }}>
          <Icon name="logo-facebook" />
      </Button>
      <Button disabled style={{ backgroundColor: '#DD5144' }}>
          <Icon name="ios-mail" />
      </Button>
  </Fab>

    <this.addModalHandler />
    <this.editModalHandler />
  
  </View>
  </ImageBackground>
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