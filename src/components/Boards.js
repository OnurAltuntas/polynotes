import React,{useState,useEffect, Component}from 'react'
import { StyleSheet, View,FlatList,Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,BackHandler,ImageBackground} from 'react-native'
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

            <Button style={styles.addButton}
              title="Add"
              onPress={() => {
                this.props.addBoards(
                  this.state.title,
               
                );
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
             
              <Text>X</Text>
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
    
  const image = { uri: "https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&amp;fit=crop&amp;w=750&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" };
  
    return(
      <FlatList style={{width:'100%'}}
      data = {this.props.boardsList}
      keyExtractor={(item) => item.key}
      renderItem={({item})=>{
        var temp = item;
        var tempKey = JSON.stringify(item.key).split('undefined').toString().replace(/['"]+/g, '').replace(',','');
      
        return(
          
         <View style={{flex: 1}}>
         <ImageBackground source={image} style={styles.image}>
       
          <TouchableOpacity  style={styles.card}
          onPress={() => this.props.navigation.navigate('TodosScreen',{
            boardId:temp.title,
            boardKey:tempKey
          })}
          >
         
          <Text style={{fontSize:22 ,marginTop:20, marginBottom:20}}
          
          >{item.title}</Text> 
          
         <View  style={{flex: 1, flexDirection: 'row'}}>
         <Text style={styles.text} onPress={() => this.editHandler(item.key)}>✎</Text>
         <Text style={styles.text }  onPress={() => this.props.deleteBoards(item.key)}> 🗑 </Text>
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
  console.log('//////////////////////',this.props.boardsList);
  return (
    
    <View style={styles.centeredView}>
    <this.drawHandler />
    <Fab icon="add"
      active={false}
      direction="right"
      containerStyle={{ marginLeft: 10 }}
      style={{ backgroundColor: '#FFB500' }}
      position="bottomRight"
      onPress={() => this.addHandler()}
      
  >
    <Icon name="ios-search" />
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