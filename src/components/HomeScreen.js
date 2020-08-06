import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Image,
  TextInput,Button
} from 'react-native';
import {addBoards} from '../redux/actions/index'
import {connect} from 'react-redux'


class HomeScreen extends React.Component {
  componentDidMount(){
  console.log('vay amk')

  }
    state = {
        id:"",
        title:"",
        modalVisible:false
    }

   sumbitHandler = () => {
    this.props.addBoards(this.state.id,this.state.title);
    this.setState({
        id:'',
        title:''
    })
    this.setState({modalVisible:!this.state.modalVisible});

    
    
  };

  render(){
   
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>


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
            placeholder="id"
            onChangeText={id => this.setState({id})} value={this.state.id}
            value={this.state.id}></TextInput>
          <TextInput
            placeholder="content"
            onChangeText={title => this.setState({title})} value={this.state.title}
            value={this.state.title}></TextInput>
          <Button title="Submit" onPress={this.sumbitHandler}></Button>
            
  
            
            </View>
          </View>
        </Modal>
  
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.setState({modalVisible:true});
          }}
          style={styles.TouchableOpacityStyle}>
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

        </View>
      );
  }
};
const styles = StyleSheet.create({
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

export default connect(null,{addBoards})(HomeScreen) ;
