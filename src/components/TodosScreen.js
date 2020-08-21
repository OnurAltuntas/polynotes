import React, {useEffect, useState, Component} from 'react';
import {
  
  View,
  
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,ImageBackground,ToastAndroid
} from 'react-native';
import { Container, Header, Content, Button, Icon, Text,Fab } from 'native-base';
import { Footer, FooterTab  } from 'native-base';


import {getTodos} from '../redux/actions/index';
import {deleteTodos} from '../redux/actions/index';
import {editTodos} from '../redux/actions/index';
import {addTodos} from '../redux/actions/index';
import {todosToInProgress} from '../redux/actions/index';
import styles from '../components/style/styles';

import firebase from 'firebase';
import {connect} from 'react-redux';
import _ from 'lodash';
import bg from "../assests/sea.jpg"


class TodosScreen extends Component {
  componentDidMount() {
    const {boardId} = this.props.route.params;
    const {boardKey} = this.props.route.params;
   

    var temp = JSON.stringify(boardKey);


    this.props.getTodos(boardKey);
  }

  state = {
    empty: '',
    Visible: false,
    modalVisible:false,
    itemKey: '',
    add:'',

    addState: {
      empty: '',
      modalVisible: false,
    },
  };


  editHandler = ({ navigation,_itemKey }) => {
   
    this.setState({Visible: true});
    this.setState({itemKey: _itemKey});

    //this.props.navigation.navigate('EditScreen');
  };
  addHandler = () => {
    this.setState({modalVisible: true});
  };

  addModalHandler = () => {
    const {boardKey} = this.props.route.params;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
         
          this.setState({modalVisible: false});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
            placeholder="enter here"
              onChangeText={(add) => this.setState({add})}
              value={this.state.add}
              value={this.state.add}></TextInput>

            <Button style={styles.addButton}
              title="Add"
              onPress={() => {

                if(this.state.add===""){
                  ToastAndroid.show("Empty task cannot be entered!", ToastAndroid.SHORT);
                }
                else{
                  this.props.addTodos(
                    this.state.add,
                    boardKey,
                  );
                }
                this.setState({title:''});
                this.setState({modalVisible: false});
               
              }}><Text>Add</Text></Button>

              <Button style={styles.closeButton} iconLeft light
            
              title="Close"
              onPress={() => {
                this.setState({modalVisible: false});
              }}>
             
              <Text style={{fontSize:18,color:"#fff"}}>X</Text>
              </Button>
          </View>
        </View>
      </Modal>
    );
  };

  editModalHandler = () => {
    const {boardKey} = this.props.route.params;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.Visible}
        onRequestClose={() => {
          this.setState({Visible: false});

        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="enter here"
              onChangeText={(empty) => this.setState({empty})}
              value={this.state.empty}
              value={this.state.empty}></TextInput>

            <Button style={styles.addButton}
              title="Edit this Todo"
              onPress={() => {

                if(this.state.empty===""){
                  ToastAndroid.show("Empty task cannot be entered!", ToastAndroid.SHORT);
                }
                else{
               
                  this.props.editTodos(
                    this.state.empty,
                    boardKey,
                    this.state.itemKey,
                  );
                }

                this.setState({empty: ''});
                this.setState({Visible: false});
              }}>   <Text>Edit</Text></Button>

              <Button style={styles.closeButton} iconLeft light
            
              title="Close"
              onPress={() => {
                this.setState({Visible: false});
              }}>
             
              <Text style={{fontSize:18,color:"#fff"}}>X</Text>
              </Button>
              
          </View>
        </View>
      </Modal>
    );
  };

  drawHandler = ({navigation, route}) => {
  const image = { uri: "https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&amp;fit=crop&amp;w=750&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" };

    const {boardKey} = this.props.route.params;
    return (

        <FlatList
          style={{width: '100%'}}
          data={this.props.todosList}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1}}>
              <ImageBackground  source={image}  style={ styles.image}
              imageStyle={{ borderRadius: 25 }}>
              <TouchableOpacity  style={styles.card}>
              
              <Text style={{fontSize:20 ,marginTop:20, marginBottom:20,backgroundColor:"#DCEEF2",minWidth:200,textAlign:"center",borderRadius:10,opacity: 0.9,paddingRight:10,paddingLeft:10}}
          
          >{item.empty}</Text>
              <View  style={{flex: 1, flexDirection: 'row'}}>
             
               
                <Text style={styles.text} onPress={() => this.editHandler(item.key)}>✎</Text>
                <Text style={styles.text}
                  onPress={() => this.props.deleteTodos(boardKey, item.key)} //
                >
                🗑
                </Text>
                <Text style={styles.text}
                  onPress={() => {
                    this.props.todosToInProgress(
                      item.empty,
                      boardKey,
                      item.key,
                    );
                    this.props.navigation.navigate('InProgressScreen', {
                      boardKey: boardKey,
                    });
                  }}>
                  ➜
                </Text>

                </View>
              
              </TouchableOpacity>
              </ImageBackground>
              </View>
            );
          }}
        />

       
     
    );
  };

  render() {
    const {boardKey} = this.props.route.params;

    return (
   

    <View style={{flex:1}}>

    <Container>
    <ImageBackground source={bg} style={styles.backgroundImage} >
     <this.drawHandler />
     <this.addModalHandler/>
     <this.editModalHandler/>
        <Footer>
          <FooterTab  style={{backgroundColor:"#133149"}}>

          <Button vertical
          onPress={() =>
           this.props.navigation.navigate('TodosScreen', {
             boardKey: boardKey,
           })
         }
          
          >
          <Text style={{color:"#fff",fontSize:15}}>//</Text>
          <Text style={{color:"#fff",fontSize:13,  fontWeight: 'bold'}}>Todo</Text>

        </Button>
           
            <Button vertical
            onPress={() =>
              this.props.navigation.navigate('InProgressScreen', {
                boardKey: boardKey,
              })
            }
            >
             
            <Text style={{color:"#fff",fontSize:20, fontWeight: 'bold'}}>⋯</Text>
              <Text style={{color:"#fff",fontSize:13,  fontWeight: 'bold'}}>Wip</Text>

            </Button>

            <Button vertical
            onPress={() =>
              this.props.navigation.navigate('DoneScreen', {
                boardKey: boardKey,
              })
            }
            >
          <Text style={{color:"#fff",fontSize:20,  fontWeight: 'bold'}}>	✓</Text>
           <Text style={{color:"#fff",fontSize:13,  fontWeight: 'bold'}}>Done</Text>

            </Button>
           
         
          </FooterTab>
        </Footer>

        <Fab icon="add"
        active={false}
        direction="right"
        containerStyle={{ marginLeft: 10,marginBottom:50}}
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
    </ImageBackground>
    </Container> 
    </View>
 

    );
  }
}



function mapStateToProps(state) {
  const todosList = _.map(state.todosList.todosList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    todosList,
  };
}

export default connect(mapStateToProps, {
  getTodos,
  deleteTodos,
  editTodos,
  addTodos,
  todosToInProgress,
})(TodosScreen);
