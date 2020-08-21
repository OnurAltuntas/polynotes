import React, {useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ToastAndroid
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Fab,
  Footer,
  FooterTab,
} from 'native-base';

import {getDones} from '../redux/actions/index';
import {deleteDones} from '../redux/actions/index';
import {addDones} from '../redux/actions/index';
import {editDones} from '../redux/actions/index';
import styles from '../components/style/styles';
import firebase from 'firebase';
import {connect} from 'react-redux';
import _ from 'lodash';
import bg from "../assests/sea.jpg"


class DoneScreen extends Component {
  componentDidMount() {
    const {boardKey} = this.props.route.params;

    var temp = JSON.stringify(boardKey);


    this.props.getDones(boardKey);
  }

  state = {
    empty: '',
    Visible: false,
    modalVisible: false,
    itemKey: '',
    add: '',

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
              placeholder="enter here"
              onChangeText={(add) => this.setState({add})}
              value={this.state.add}
              value={this.state.add}></TextInput>

            <Button
              style={styles.addButton}
              title="Edit this Todo"
              onPress={() => {
                if (this.state.add === '') {
                  ToastAndroid.show(
                    'Empty task cannot be entered!',
                    ToastAndroid.SHORT,
                  );
                } else {
                  this.props.addDones(this.state.add, boardKey);
                }

                this.setState({add: ''});
                this.setState({modalVisible: false});
              }}>
              <Text>Add</Text>
            </Button>

            <Button
              style={styles.closeButton}
              iconLeft
              light
              title="Close"
              onPress={() => {
                this.setState({modalVisible: false});
              }}>
              <Text style={{fontSize:18,color:"#fff"}}>   X</Text>
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
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="enter here"
              onChangeText={(empty) => this.setState({empty})}
              value={this.state.empty}
              value={this.state.empty}></TextInput>

            <Button
              style={styles.addButton}
              title="Edit this Todo"
              onPress={() => {
                if (this.state.empty === '') {
                  ToastAndroid.show(
                    'Empty task cannot be entered!',
                    ToastAndroid.SHORT,
                  );
                } else {
                  this.props.editDones(
                    this.state.empty,
                    boardKey,
                    this.state.itemKey,
                  );
                }

                this.setState({empty: ''});
                this.setState({Visible: false});
              }}>
              <Text>Edit</Text>
            </Button>

            <Button
              style={styles.closeButton}
              iconLeft
              light
              title="Close"
              onPress={() => {
                this.setState({Visible: false});
              }}>
              <Text style={{fontSize:18,color:"#fff"}}>   X</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  drawHandler = ({navigation, route}) => {
    const {boardKey} = this.props.route.params;
    const image = {
      uri:
        'https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&amp;fit=crop&amp;w=750&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    };

    return (
      <FlatList
        style={{width: '100%'}}
        data={this.props.donesList}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <View style={{flex: 1}}>
              <ImageBackground
                source={image}
                style={styles.image}
                imageStyle={{borderRadius: 25}}>
                <TouchableOpacity style={styles.card}>
                <Text style={{fontSize:20 ,marginTop:20, marginBottom:20,backgroundColor:"#DCEEF2",minWidth:200,textAlign:"center",borderRadius:10,opacity: 0.9,paddingRight:10,paddingLeft:10}}
          
                >{item.empty}</Text>

                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text
                      style={styles.text}
                      onPress={() => this.editHandler(item.key)}>
                      ✎
                    </Text>
                    <Text
                      style={styles.text}
                      onPress={() => this.props.deleteDones(boardKey, item.key)} //
                    >
                      🗑
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
      <Container >
      <ImageBackground source={bg} style={styles.backgroundImage} >
        <this.drawHandler />
        <this.addModalHandler/>
        <this.editModalHandler/>
        <Footer>
          <FooterTab style={{backgroundColor: '#133149'}}>
            <Button
              vertical
              onPress={() =>
                this.props.navigation.navigate('TodosScreen', {
                  boardKey: boardKey,
                })
              }>
              <Text
                style={{color: '#DCEEF2', fontSize: 15, fontWeight: 'bold'}}>
                //
              </Text>
              <Text
                style={{color: '#DCEEF2', fontSize: 13, fontWeight: 'bold'}}>
                Todo
              </Text>
            </Button>

            <Button
              vertical
              onPress={() =>
                this.props.navigation.navigate('InProgressScreen', {
                  boardKey: boardKey,
                })
              }>
              <Text
                style={{color: '#DCEEF2', fontSize: 25, fontWeight: 'bold'}}>
                ⋯
              </Text>
              <Text
                style={{color: '#DCEEF2', fontSize: 13, fontWeight: 'bold'}}>
                Wip
              </Text>
            </Button>

            <Button
              vertical
              onPress={() =>
                this.props.navigation.navigate('DoneScreen', {
                  boardKey: boardKey,
                })
              }>
              <Text
                style={{color: '#DCEEF2', fontSize: 20, fontWeight: 'bold'}}>
                {' '}
                ✓
              </Text>
              <Text
                style={{color: '#DCEEF2', fontSize: 13, fontWeight: 'bold'}}>
                Done
              </Text>
            </Button>
          </FooterTab>
        </Footer>

        <Fab
          icon="add"
          active={false}
          direction="right"
          containerStyle={{marginLeft: 10, marginBottom: 50}}
          style={{backgroundColor: '#FFB500'}}
          position="bottomRight"
          onPress={() => this.addHandler()}>
          <Icon name="add" />
          <Button style={{backgroundColor: '#34A34F'}}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={{backgroundColor: '#3B5998'}}>
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{backgroundColor: '#DD5144'}}>
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

export default connect(mapStateToProps, {
  getDones,
  deleteDones,
  addDones,
  editDones,
})(DoneScreen);
