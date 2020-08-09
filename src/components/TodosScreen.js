import React, {useEffect, useState, Component} from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
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


  editHandler = ({ navigation }) => {
   
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
              placeholder=""
              onChangeText={(add) => this.setState({add})}
              value={this.state.add}
              value={this.state.add}></TextInput>

            <Button
              title="Add"
              onPress={() => {
                this.props.addTodos(
                  this.state.add,
                  boardKey,
                );
                this.setState({add: ''});
                this.setState({modalVisible: false});
              }}></Button>
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
              placeholder=""
              onChangeText={(empty) => this.setState({empty})}
              value={this.state.empty}
              value={this.state.empty}></TextInput>

            <Button
              title="Edit this Todo"
              onPress={() => {
                this.props.editTodos(
                  this.state.empty,
                  boardKey,
                  this.state.itemKey,
                );
                this.setState({empty: ''});
                this.setState({Visible: false});
              }}></Button>
          </View>
        </View>
      </Modal>
    );
  };

  drawHandler = ({navigation, route}) => {
    const {boardKey} = this.props.route.params;
    return (
    
      

        <FlatList
          style={{width: '100%'}}
          data={this.props.todosList}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1}}>
              <TouchableOpacity  style={styles.card}>
              
                <Text style={styles.text} >{item.empty}</Text>
                <Text style={styles.text} onPress={() => this.editHandler(item.key)}>Edit</Text>
                <Text style={styles.text}
                  onPress={() => this.props.deleteTodos(boardKey, item.key)} //
                >
                  Delete
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
                  InProgress
                </Text>
                <Text style={styles.text}
                onPress={() => this.addHandler()}
                ></Text>
              </TouchableOpacity>
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
      <View style={styles.centeredView}>
        <this.drawHandler />
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.addHandler()}>
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

        <Button
        title="InProgress -->"
        onPress={() =>
          this.props.navigation.navigate('InProgressScreen', {
            boardKey: boardKey,
          })
        }
      />

        <this.addModalHandler />
        <this.editModalHandler />
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
