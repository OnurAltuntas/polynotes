import React, {useEffect, useState, Component} from 'react';
import {Button, View, Text, FlatList, StyleSheet,Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,} from 'react-native';
import {getDones} from '../redux/actions/index';
import {deleteDones} from '../redux/actions/index';
import {addDones} from '../redux/actions/index';
import {editDones} from '../redux/actions/index';
import styles from '../components/style/styles';
import firebase from 'firebase';
import {connect} from 'react-redux';
import _ from 'lodash';

class DoneScreen extends Component {
  componentDidMount() {

    const {boardKey} = this.props.route.params;

    var temp = JSON.stringify(boardKey);

    console.log(boardKey);

    this.props.getDones(boardKey);
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


  editHandler = (_itemKey) => {
    this.setState({Visible: true});
    this.setState({itemKey: _itemKey});
    console.log('$$$$$$$$$$$$$$$$' + _itemKey);

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
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder=""
              onChangeText={(add) => this.setState({add})}
              value={this.state.add}
              value={this.state.add}></TextInput>

            <Button
              title="Edit this Todo"
              onPress={() => {
                this.props.addDones(
                  this.state.add,
                  boardKey,
                );
                this.setState({add: ''});
                this.setState({modalVisible: false});
              }}></Button>
          </View>
        </View>
      </Modal>
    )
  };

  editModalHandler = () => {
    const {boardKey} = this.props.route.params;
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
              placeholder=""
              onChangeText={(empty) => this.setState({empty})}
              value={this.state.empty}
              value={this.state.empty}></TextInput>

            <Button
              title="Edit this Todo"
              onPress={() => {
                this.props.editDones(
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
          data={this.props.donesList}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1}}>
              <TouchableOpacity  style={styles.card}>
                <Text style={styles.text}>{item.empty}</Text>
                <Text style={styles.text} onPress={() => this.editHandler(item.key)}>Edit</Text>
                <Text style={styles.text}
                onPress={() => this.props.deleteDones(boardKey, item.key)} //
                >
                Delete
              </Text>
              </TouchableOpacity>
              </View>
            );
          }}
        />
      
    
    );
  };

  render() {
    console.log('---------------------', this.props.donesList);
    const {boardKey} = this.props.route.params;

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

      <Button
      title='<-- InProgress '
      onPress={() => this.props.navigation.navigate('InProgressScreen',{
        boardKey:boardKey
      })}
      />

    </View>
    );
  }
}


function mapStateToProps(state) {
  const donesList = _.map(state.donesList.donesList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    donesList,
  };
}

export default connect(mapStateToProps, {getDones,deleteDones,addDones,editDones})(DoneScreen);
