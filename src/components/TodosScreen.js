import React, {useEffect, useState, Component} from 'react';
import {Button, View, Text, FlatList, StyleSheet, Alert,
  Modal,TextInput,TouchableOpacity,Image} from 'react-native';
import {getTodos} from '../redux/actions/index';
import {deleteTodos} from '../redux/actions/index';
import {editTodos} from '../redux/actions/index';
import {addTodos} from '../redux/actions/index';
import {todosToInProgress} from '../redux/actions/index';



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
    empty:"",
    Visible:false,
    itemKey:'',

    addState :{
      empty:"",
      modalVisible:false
    }
  }

  
  

  sumbitHandler = () => {
    this.props.editTodos(this.state.empty,boardKey,item.key);
    this.setState({
      empty:''
    
    })
    this.setState({editState:{addState:{modalVisible:!this.state.modalVisible}}});
    
  };

  editHandler = (_itemKey) => {
    this.setState({Visible:true})
    this.setState({itemKey:_itemKey})
    console.log('$$$$$$$$$$$$$$$$'+_itemKey);

    //this.props.navigation.navigate('EditScreen');
  }
  addHandler = () => {
    this.setState({addState:{modalVisible:true}})
    this.setState({addState:{modalVisible:true}})
    console.log('ffffffffffffff'+this.state.addState.modalVisible);
  }

  addModalHandler = ()=>{
    const {boardKey} = this.props.route.params;
      return(
        <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.addState.modalVisible}
        onRequestClose={() => {
          this.setState({addState:{modalVisible:false}});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          <TextInput
          placeholder=''
          onChangeText={empty => this.setState({addState:{empty:empty}})} 
          value={this.state.addState.empty}></TextInput>
          
     
          <Button title="Add new Todo" onPress={
            () => {
              //console.log(this.state.addState.empty);
              this.props.addTodos(this.state.addState.empty,boardKey);
              this.setState({addState:{empty:''}})
             
              
            }
          
          }></Button>
            </View>
          </View>
        </Modal>
        
        </View>
        
      )
    
  }

  editModalHandler = ()=>{
   
    const {boardKey} = this.props.route.params;
    return(
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
      placeholder=''
      onChangeText={empty =>this.setState({empty})} value={this.state.empty}
      value={this.state.empty}></TextInput>

    <Button title="Edit this Todo" onPress={
      () => {
        this.props.editTodos(this.state.empty,boardKey,this.state.itemKey);
        this.setState({empty:''})
        this.setState({Visible:false});
      }
    

    }></Button>

        </View>
      </View>
    </Modal>
    )
  }


  drawHandler = ({navigation, route}) => {
    const {boardKey} = this.props.route.params;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize:24}}>Todo Page</Text>

        <FlatList
          style={{width: '100%'}}
          data={this.props.todosList}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={styles.centeredView}>
                <Text
                >{item.empty}</Text>
                <Text
                onPress={() => this.editHandler(item.key) }
                
                >Edit</Text>
                <Text
                onPress={()=> this.props.deleteTodos(boardKey,item.key) }//

                >Delete</Text>
                <Text
                onPress={()=>{
                  this.props.todosToInProgress(item.empty,boardKey,item.key) 
                  this.props.navigation.navigate('InProgressScreen',{
                    boardKey:boardKey
                  })
                }} 
                >InProgress</Text>

               
              
              </View>

              
            );
          }}
        />

       

        <Button
        title='InProgress -->'
        onPress={() => this.props.navigation.navigate('InProgressScreen',{
          boardKey:boardKey
        })}
        
        />
      </View>
    );
  };

  render() {
    console.log('---------------------', this.props.todosList);

    return (
      <View style={styles.centeredView}>
        <this.drawHandler />
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.addHandler}
       >
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

      <this.addModalHandler/>
      <this.editModalHandler/>
      

      

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});



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

export default connect(mapStateToProps, {getTodos,deleteTodos,editTodos,addTodos,todosToInProgress})(TodosScreen);
