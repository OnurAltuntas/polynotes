import React, {useEffect, useState, Component} from 'react';
import {
  
  View,
  
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,ImageBackground
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

class TodosScreen extends Component {
  componentDidMount() {
    const {boardId} = this.props.route.params;
    const {boardKey} = this.props.route.params;
   

    var temp = JSON.stringify(boardKey);

    console.log(boardKey);

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
    console.log('$$$$$$$$$$$$$$$$' + _itemKey);

    //this.props.navigation.navigate('EditScreen');
  };
  addHandler = (_itemKey) => {
    this.setState({modalVisible: true});
    console.log('ffffffffffffff' + this.state.modalVisible);
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
                this.props.addTodos(
                  this.state.add,
                  boardKey,
                );
                this.setState({add: ''});
                this.setState({modalVisible: false});
              }}><Text>Add</Text></Button>

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
                this.props.editTodos(
                  this.state.empty,
                  boardKey,
                  this.state.itemKey,
                );
                this.setState({empty: ''});
                this.setState({Visible: false});
              }}>   <Text>Edit</Text></Button>

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
              <ImageBackground source={image} style={styles.image}>
              <TouchableOpacity  style={styles.card}>
              
              <Text style={{fontSize:22 ,marginTop:20, marginBottom:20}} >{item.empty}</Text>
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
                <Text style={{fontSize:22}}
                onPress={() => this.addHandler()}
                ></Text>
              </TouchableOpacity>
              </ImageBackground>
              </View>
            );
          }}
        />

       
     
    );
  };

  render() {
    console.log('---------------------', this.props.todosList);
    const {boardKey} = this.props.route.params;

    return (
     <Container >
     <Text>Todos</Text>
     <this.drawHandler />
        <Footer>
          <FooterTab  style={{backgroundColor:"#FFB500"}}>

          <Button vertical
          onPress={() =>
           this.props.navigation.navigate('TodosScreen', {
             boardKey: boardKey,
           })
         }
          
          >
          <Icon active name="navigate" />
          <Text style={{color:"#000"}}>Todo</Text>

        </Button>
           
            <Button vertical
            onPress={() =>
              this.props.navigation.navigate('InProgressScreen', {
                boardKey: boardKey,
              })
            }
            >
              <Icon name="camera" />
              <Text style={{color:"#000"}}>Wip</Text>

            </Button>

            <Button vertical
            onPress={() =>
              this.props.navigation.navigate('DoneScreen', {
                boardKey: boardKey,
              })
            }
            >
              <Icon name="apps" />
           <Text style={{color:"#000"}}>Done</Text>

            </Button>
           
         
          </FooterTab>
        </Footer>

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

        
      </Container>
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
  console.log('%%%%%%%%%%%%%%%%%%%%', todosList);

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
